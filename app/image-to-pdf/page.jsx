import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("image-to-pdf");

export const metadata = buildToolMetadata(tool);

export default function ImageToPdfPage() {
  return <ToolLanding tool={tool} />;
}
