import os

tools = [
    {"slug": "jpeg-to-text", "component": "JpegToTextPage"},
    {"slug": "photo-to-text", "component": "PhotoToTextPage"},
    {"slug": "scanned-pdf-to-text", "component": "ScannedPdfToTextPage"}
]

base_dir = "/home/elango/Music/ocr/app"

for tool in tools:
    dir_path = os.path.join(base_dir, tool["slug"])
    os.makedirs(dir_path, exist_ok=True)
    
    content = f"""import ToolLanding, {{ buildToolMetadata }} from "../components/tools/ToolLanding";
import {{ getToolPage }} from "../lib/tools/toolPages";

const tool = getToolPage("{tool['slug']}");

export const metadata = buildToolMetadata(tool);

export default function {tool['component']}() {{
  return <ToolLanding tool={{tool}} />;
}}
"""
    with open(os.path.join(dir_path, "page.jsx"), "w") as f:
        f.write(content)

print("Created page.jsx for the 3 tools.")
