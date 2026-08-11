import ToolLanding, { buildToolMetadata } from "../components/tools/ToolLanding";
import { getToolPage } from "../lib/tools/toolPages";

const tool = getToolPage("screenshot-to-text");

export const metadata = buildToolMetadata(tool);

export default function ScreenshotToTextPage() {
  return <ToolLanding tool={tool} />;
}
