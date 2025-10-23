const fs = require("fs");
const path = require("path");

const ignore = ["node_modules", ".next", ".git", "dist", "out"];

function walk(dir) {
    const result = [];
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        if (ignore.includes(item.name)) continue;

        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            result.push({
                name: item.name,
                type: "directory",
                children: walk(fullPath),
            });
        } else {
            result.push({
                name: item.name,
                type: "file",
            });
        }
    }
    return result;
}

const rootDir = process.argv[2] || ".";
const structure = walk(rootDir);

fs.writeFileSync("structure.json", JSON.stringify(structure, null, 2));

console.log("✅ Файл structure.json успешно создан!");
