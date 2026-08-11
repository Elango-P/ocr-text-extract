import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("image-to-word");

export const metadata = buildToolMetadata(tool);

export default function ImageToWordPage() {
  return <ToolLanding tool={tool} />;
}
