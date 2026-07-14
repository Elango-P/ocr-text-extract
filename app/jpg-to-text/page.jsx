import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("jpg-to-text");

export const metadata = buildToolMetadata(tool);

export default function JpgToTextPage() {
  return <ToolLanding tool={tool} />;
}
