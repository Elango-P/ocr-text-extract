"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Undo2,
  Redo2,
  Copy,
  Download,
  Trash2,
  FileText,
  FileType,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Check,
  ChevronDown,
  RotateCcw,
  Wand2,
  ListFilter,
  Eye,
  FileCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  downloadTxt,
  downloadDocx,
  downloadPdf,
  findPdfUnsupportedChars,
  sanitizeFilename,
} from "../../lib/export/downloadTextFormats";
import { detectOcrErrors } from "../../lib/ocr/errorDetection";
import {
  removeExcessiveBlankLines,
  normalizeWhitespace,
  fixLineBreaks,
  preserveParagraphs,
  removeRepeatedHeadersFooters,
} from "../../lib/ocr/textCleanup";

export default function TextWorkspace({
  activeItem,
  onUpdateText,
  onClearText,
  onRestoreOriginalOcr,
}) {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'review' | 'cleanup'
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [editingIssueId, setEditingIssueId] = useState(null);
  const [customEditText, setCustomEditText] = useState("");
  const [dismissedIssues, setDismissedIssues] = useState(new Set());
  const [filterCategory, setFilterCategory] = useState("all");
  const [showLineNumbers, setShowLineNumbers] = useState(false);

  // Undo / Redo History Stack per image
  // activeItem.history is managed, or fallback to local
  const [history, setHistory] = useState([activeItem?.text || ""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const textareaRef = useRef(null);
  const exportMenuRef = useRef(null);

  const currentText = activeItem?.text ?? "";
  const originalOcrText = activeItem?.originalOcrText ?? "";
  const isTextModified = currentText !== originalOcrText;

  // Close export dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target)) {
        setShowExportMenu(false);
      }
    };
    if (showExportMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [showExportMenu]);

  // Push new text state to undo history
  const pushHistory = useCallback(
    (newText) => {
      setHistory((prev) => {
        const sliced = prev.slice(0, historyIndex + 1);
        return [...sliced, newText];
      });
      setHistoryIndex((prev) => prev + 1);
      onUpdateText(newText);
    },
    [historyIndex, onUpdateText]
  );

  // Undo action
  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      const textToRestore = history[nextIndex];
      onUpdateText(textToRestore);
      toast("Undone", { icon: "↩️", duration: 1500 });
    }
  };

  // Redo action
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      const textToRestore = history[nextIndex];
      onUpdateText(textToRestore);
      toast("Redone", { icon: "↪️", duration: 1500 });
    }
  };

  // Direct text edit in textarea
  const handleTextChange = (e) => {
    const val = e.target.value;
    pushHistory(val);
  };

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Cmd+Shift+Z)
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      e.preventDefault();
      if (e.shiftKey) {
        handleRedo();
      } else {
        handleUndo();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
      e.preventDefault();
      handleRedo();
    }
  };

  // Run error detection on current text
  const detectedIssues = useMemo(() => {
    return detectOcrErrors(currentText, {
      words: activeItem?.words || [],
      engine: activeItem?.engine || null,
      dismissedIds: dismissedIssues,
    });
  }, [currentText, activeItem?.words, activeItem?.engine, dismissedIssues]);

  // Filter issues
  const filteredIssues = useMemo(() => {
    if (filterCategory === "all") return detectedIssues;
    if (filterCategory === "engine") {
      return detectedIssues.filter((i) => i.isGenuineEngineConfidence);
    }
    if (filterCategory === "heuristic") {
      return detectedIssues.filter((i) => !i.isGenuineEngineConfidence);
    }
    return detectedIssues.filter((i) => i.type === filterCategory);
  }, [detectedIssues, filterCategory]);

  // Character and word counts
  const characterCount = currentText.length;
  const wordCount = currentText.trim()
    ? currentText.trim().split(/\s+/).filter(Boolean).length
    : 0;

  // Filename base for exports
  const fileBaseName = useMemo(() => {
    const clean = sanitizeFilename(activeItem?.name, "extracted-text");
    return `${clean}-extracted`;
  }, [activeItem?.name]);

  // Copy to clipboard
  const handleCopyAll = () => {
    if (!currentText) {
      toast.error("No text to copy");
      return;
    }
    navigator.clipboard.writeText(currentText);
    toast.success("Copied to clipboard!");
  };

  // Export handlers
  const handleExportTxt = () => {
    if (!currentText) return toast.error("Text is empty");
    downloadTxt(currentText, `${fileBaseName}.txt`);
    toast.success("Downloaded TXT");
    setShowExportMenu(false);
  };

  const handleExportDocx = () => {
    if (!currentText) return toast.error("Text is empty");
    downloadDocx(currentText, `${fileBaseName}.docx`);
    toast.success("Downloaded DOCX");
    setShowExportMenu(false);
  };

  const handleExportPdf = () => {
    if (!currentText) return toast.error("Text is empty");
    const unsupported = findPdfUnsupportedChars(currentText);
    downloadPdf(currentText, `${fileBaseName}.pdf`);
    if (unsupported.length) {
      toast(
        `PDF saved. Note: ${unsupported.length} non-Latin character(s) were replaced with '?'. Use DOCX or TXT to retain all scripts.`,
        { icon: "⚠️", duration: 6000 }
      );
    } else {
      toast.success("Downloaded PDF");
    }
    setShowExportMenu(false);
  };

  // Error Review actions
  const handleApplyFix = (issue) => {
    if (!issue.suggestedFix && issue.suggestedFix !== "") return;
    const start = issue.index;
    const end = issue.index + issue.length;
    const updated = currentText.slice(0, start) + issue.suggestedFix + currentText.slice(end);
    pushHistory(updated);
    toast.success(`Applied fix: "${issue.suggestedFix}"`);
  };

  const handleDismissIssue = (issueId) => {
    setDismissedIssues((prev) => {
      const next = new Set(prev);
      next.add(issueId);
      return next;
    });
    toast("Warning dismissed", { duration: 1500 });
  };

  const handleStartCustomEdit = (issue) => {
    setEditingIssueId(issue.id);
    setCustomEditText(issue.word);
  };

  const handleSaveCustomEdit = (issue) => {
    const start = issue.index;
    const end = issue.index + issue.length;
    const updated = currentText.slice(0, start) + customEditText + currentText.slice(end);
    pushHistory(updated);
    setEditingIssueId(null);
    toast.success("Word updated");
  };

  const handleJumpToIssue = (issue) => {
    setActiveTab("editor");
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(issue.index, issue.index + issue.length);
      }
    }, 50);
  };

  // Cleanup tool actions
  const applyCleanupTool = (toolFn, toolName) => {
    if (!currentText) return;
    const result = toolFn(currentText);
    if (!result.changed) {
      toast(result.description || `${toolName}: No changes needed.`);
      return;
    }
    pushHistory(result.text);
    toast.success(`${toolName}: ${result.description}`);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
      {/* Top Header / Tab Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-50/80 px-4 py-2.5">
        {/* Workspace Mode Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-200/70 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("editor")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition ${
              activeTab === "editor"
                ? "bg-white text-cyan-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Editor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("review")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition relative ${
              activeTab === "review"
                ? "bg-white text-cyan-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            <span>Review Errors</span>
            {detectedIssues.length > 0 && (
              <span className="rounded-full bg-amber-500 text-white px-1.5 py-0.2 text-[10px] font-extrabold">
                {detectedIssues.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("cleanup")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition ${
              activeTab === "cleanup"
                ? "bg-white text-cyan-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>Cleanup Tools</span>
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Undo / Redo */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-xs">
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="rounded p-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
              title="Undo (Ctrl+Z)"
              aria-label="Undo edit"
            >
              <Undo2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="rounded p-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
              title="Redo (Ctrl+Y)"
              aria-label="Redo edit"
            >
              <Redo2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Copy All */}
          <button
            type="button"
            onClick={handleCopyAll}
            disabled={!currentText}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
            title="Copy all extracted text"
          >
            <Copy className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Copy All</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative" ref={exportMenuRef}>
            <button
              type="button"
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={!currentText}
              className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 px-3 py-1 text-xs font-bold text-white shadow-xs hover:brightness-110 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg z-20 animate-fadeIn">
                <button
                  type="button"
                  onClick={handleExportTxt}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <FileText className="h-4 w-4 text-slate-500" />
                  <span>Download .TXT</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportDocx}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <FileType className="h-4 w-4 text-blue-600" />
                  <span>Download .DOCX</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportPdf}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <FileCheck className="h-4 w-4 text-rose-600" />
                  <span>Download .PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* Restore Original OCR Button (if modified) */}
          {isTextModified && originalOcrText && (
            <button
              type="button"
              onClick={() => {
                pushHistory(originalOcrText);
                toast("Restored initial unedited OCR output", { icon: "🔄" });
              }}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 shadow-xs hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
              title="Restore Original Unedited OCR Text"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden md:inline">Restore OCR</span>
            </button>
          )}

          {/* Clear Text */}
          <button
            type="button"
            onClick={onClearText}
            disabled={!currentText}
            className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-600"
            title="Clear all text"
            aria-label="Clear all text"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      <div className="flex-1 flex flex-col min-h-0 bg-white">
        {/* 1. EDITOR TAB */}
        {activeTab === "editor" && (
          <div className="flex-1 flex flex-col p-4 sm:p-5 relative min-h-[300px] sm:min-h-[420px]">
            <textarea
              ref={textareaRef}
              id="extracted-text-editor"
              value={currentText}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder="Your extracted text will appear here. You can freely edit, format, proofread, or clean it up..."
              className="flex-1 w-full resize-none font-mono text-sm leading-relaxed text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
              spellCheck="true"
              aria-label="Editable extracted text"
            />
          </div>
        )}

        {/* 2. ERROR DETECTION & REVIEW TAB */}
        {activeTab === "review" && (
          <div className="flex-1 flex flex-col p-4 sm:p-5 overflow-y-auto max-h-[500px]">
            {/* Header / Engine Status */}
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs text-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Review OCR Output</span>
                  <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    Engine: {activeItem?.engine === "ai" ? "Gemini Cloud AI" : "Browser Tesseract.js"}
                  </span>
                </div>
                <span className="text-slate-500">
                  {detectedIssues.length} suspicious item{detectedIssues.length === 1 ? "" : "s"} detected
                </span>
              </div>
              <p className="mt-1.5 text-slate-500 leading-relaxed text-[11px]">
                {activeItem?.engine === "browser"
                  ? "Genuine word-level recognition confidence from Tesseract is displayed alongside context-aware heuristics."
                  : "AI OCR does not expose token-level confidence scores. Potential character mixups (O/0, I/1, S/5), dates, and emails are evaluated contextually."}
                {" "}Text is never changed automatically without your approval.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <ListFilter className="h-3 w-3" /> Filter:
              </span>
              <button
                type="button"
                onClick={() => setFilterCategory("all")}
                className={`rounded-md px-2 py-1 font-semibold transition ${
                  filterCategory === "all"
                    ? "bg-cyan-100 text-cyan-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All ({detectedIssues.length})
              </button>
              {activeItem?.engine === "browser" && (
                <button
                  type="button"
                  onClick={() => setFilterCategory("engine")}
                  className={`rounded-md px-2 py-1 font-semibold transition ${
                    filterCategory === "engine"
                      ? "bg-cyan-100 text-cyan-800"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Genuine Low Confidence
                </button>
              )}
              <button
                type="button"
                onClick={() => setFilterCategory("confusion")}
                className={`rounded-md px-2 py-1 font-semibold transition ${
                  filterCategory === "confusion"
                    ? "bg-cyan-100 text-cyan-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Character Confusions
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory("date")}
                className={`rounded-md px-2 py-1 font-semibold transition ${
                  filterCategory === "date"
                    ? "bg-cyan-100 text-cyan-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Dates
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory("email")}
                className={`rounded-md px-2 py-1 font-semibold transition ${
                  filterCategory === "email"
                    ? "bg-cyan-100 text-cyan-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Emails
              </button>
            </div>

            {/* List of Detected Issues */}
            {filteredIssues.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <CheckCircle2 className="h-10 w-10 text-teal-500 mb-2" />
                <p className="font-bold text-slate-800">No issues found</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  {detectedIssues.length > 0
                    ? "No issues in this filter category."
                    : "No character confusions, suspicious dates, or engine warnings were flagged in this text."}
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs transition hover:border-slate-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold ${
                            issue.isGenuineEngineConfidence
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {issue.categoryLabel}
                        </span>
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-800">
                          {issue.word}
                        </code>
                      </div>

                      {/* Issue Action Controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleJumpToIssue(issue)}
                          className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                          title="Locate in text"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Locate</span>
                        </button>

                        {issue.suggestedFix !== null && (
                          <button
                            type="button"
                            onClick={() => handleApplyFix(issue)}
                            className="flex items-center gap-1 rounded-md bg-teal-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-teal-700 shadow-xs"
                            title={`Replace "${issue.word}" with "${issue.suggestedFix}"`}
                          >
                            <Check className="h-3 w-3" />
                            <span>Fix: &quot;{issue.suggestedFix}&quot;</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleStartCustomEdit(issue)}
                          className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDismissIssue(issue.id)}
                          className="rounded-md px-2 py-1 text-[11px] font-semibold text-slate-400 hover:text-slate-600"
                          title="Dismiss warning"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-slate-600">{issue.message}</p>

                    {/* Inline Custom Edit Bar */}
                    {editingIssueId === issue.id && (
                      <div className="mt-3 flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50/60 p-2">
                        <span className="text-xs font-bold text-cyan-900">Edit word:</span>
                        <input
                          type="text"
                          value={customEditText}
                          onChange={(e) => setCustomEditText(e.target.value)}
                          className="flex-1 rounded border border-cyan-300 bg-white px-2 py-1 text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveCustomEdit(issue)}
                          className="rounded bg-cyan-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-cyan-700"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingIssueId(null)}
                          className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. CLEANUP TOOLS TAB */}
        {activeTab === "cleanup" && (
          <div className="flex-1 flex flex-col p-4 sm:p-5 overflow-y-auto max-h-[500px]">
            <div className="mb-4 rounded-xl border border-teal-100 bg-teal-50/70 p-3.5 text-xs text-teal-950">
              <div className="flex items-center gap-2 font-bold">
                <Wand2 className="h-4 w-4 text-teal-700" />
                <span>Text Cleanup Tools</span>
              </div>
              <p className="mt-1 text-teal-800 leading-relaxed text-[11px]">
                Clean up formatting issues created during OCR conversion. Every action can be
                instantly undone with the Undo button or reverted using &quot;Restore OCR&quot;.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* Tool 1: Blank Lines */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Remove Excessive Blank Lines</h4>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Collapses 3+ consecutive line breaks into standard paragraph spacing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => applyCleanupTool(removeExcessiveBlankLines, "Blank Lines")}
                  disabled={!currentText}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 disabled:opacity-40 transition"
                >
                  Apply
                </button>
              </div>

              {/* Tool 2: Normalize Whitespace */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Normalize Whitespace</h4>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Trims trailing spaces from line ends and merges multiple horizontal spaces into one.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => applyCleanupTool(normalizeWhitespace, "Normalize Whitespace")}
                  disabled={!currentText}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 disabled:opacity-40 transition"
                >
                  Apply
                </button>
              </div>

              {/* Tool 3: Fix Line Breaks */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Fix Mid-Sentence Line Breaks</h4>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Heals hyphenated line wraps (e.g. &quot;docu- \n ment&quot;) and merges lines broken mid-sentence.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => applyCleanupTool(fixLineBreaks, "Fix Line Breaks")}
                  disabled={!currentText}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 disabled:opacity-40 transition"
                >
                  Apply
                </button>
              </div>

              {/* Tool 4: Preserve Paragraphs */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Preserve & Flow Paragraphs</h4>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Unwraps lines within paragraphs while strictly preserving double newlines as paragraphs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => applyCleanupTool(preserveParagraphs, "Preserve Paragraphs")}
                  disabled={!currentText}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 disabled:opacity-40 transition"
                >
                  Apply
                </button>
              </div>

              {/* Tool 5: Remove Headers/Footers */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Strip Repeated Page Numbers / Headers</h4>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Detects and strips lines like &quot;Page 1 of 5&quot; or &quot;- 2 -&quot;. Only executed when you click.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => applyCleanupTool(removeRepeatedHeadersFooters, "Strip Headers/Footers")}
                  disabled={!currentText}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 disabled:opacity-40 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status / Word Count Bar */}
      <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/80 px-4 py-2 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span>
            <strong className="text-slate-700">{wordCount.toLocaleString()}</strong> words
          </span>
          <span>·</span>
          <span>
            <strong className="text-slate-700">{characterCount.toLocaleString()}</strong> characters
          </span>
          {activeItem?.confidence != null && (
            <>
              <span>·</span>
              <span>
                Quality score: <strong className="text-teal-700">{activeItem.confidence}%</strong>
              </span>
            </>
          )}
        </div>

        {isTextModified && (
          <span className="text-[11px] font-semibold text-cyan-800">
            Edited · Changes saved
          </span>
        )}
      </div>
    </div>
  );
}
