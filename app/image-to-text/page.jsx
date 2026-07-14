import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("image-to-text");

export const metadata = buildToolMetadata(tool);

export default function ImageToTextPage() {
  return <ToolLanding tool={tool} />;
}
