import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("scanned-document-to-text");

export const metadata = buildToolMetadata(tool);

export default function ScannedDocumentToTextPage() {
  return <ToolLanding tool={tool} />;
}
