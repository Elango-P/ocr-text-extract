import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("jpeg-to-text");

export const metadata = buildToolMetadata(tool);

export default function JpegToTextPage() {
  return <ToolLanding tool={tool} />;
}
