import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("pdf-to-text");

export const metadata = buildToolMetadata(tool);

export default function PdfToTextPage() {
  return <ToolLanding tool={tool} />;
}
