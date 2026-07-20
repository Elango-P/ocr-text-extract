import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("scanned-pdf-to-text");

export const metadata = buildToolMetadata(tool);

export default function ScannedPdfToTextPage() {
  return <ToolLanding tool={tool} />;
}
