import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("receipt-to-text");

export const metadata = buildToolMetadata(tool);

export default function ReceiptToTextPage() {
  return <ToolLanding tool={tool} />;
}
