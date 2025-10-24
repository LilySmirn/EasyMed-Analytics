const fs = require("fs");
const path = require("path");

// Папки, которые нужно игнорировать при обходе
const ignore = [
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "out",
    ".vercel",
    ".idea",
    ".DS_Store",
    "coverage",
    "logs",
    "tmp",
    "temp",
];

// Функция обхода директорий для Markdown
function buildTreeMarkdown(dir, prefix = "") {
    const items = fs.readdirSync(dir, { withFileTypes: true })
        .filter((item) => !ignore.includes(item.name))
        .sort((a, b) => a.name.localeCompare(b.name));

    return items.map((item, index) => {
        const isLast = index === items.length - 1;
        const pointer = isLast ? "└── " : "├── ";
        const nextPrefix = prefix + (isLast ? "    " : "│   ");
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            return (
                prefix + pointer + item.name + "/" + "\n" +
                buildTreeMarkdown(fullPath, nextPrefix)
            );
        } else {
            return prefix + pointer + item.name + "\n";
        }
    }).join("");
}

// Функция обхода директорий для JSON
function buildTreeJSON(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true })
        .filter((item) => !ignore.includes(item.name))
        .sort((a, b) => a.name.localeCompare(b.name));

    return items.map(item => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            return {
                name: item.name,
                type: "directory",
                children: buildTreeJSON(fullPath)
            };
        } else {
            return { name: item.name, type: "file" };
        }
    });
}

// Основной путь проекта
const projectDir = process.cwd();

// Генерация Markdown
const treeMarkdown = ".\n" + buildTreeMarkdown(projectDir);
const markdown = `# Полная структура проекта

Этот файл сгенерирован автоматически (см. \`generate-structure.js\`).

Ниже приведено дерево всех файлов и папок проекта:
\`\`\`text
${treeMarkdown}
\`\`\`
`;

// Генерация JSON
const treeJSON = buildTreeJSON(projectDir);

// Создаём папку docs и записываем файлы
fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/structure.md", markdown, "utf8");
fs.writeFileSync("structure.json", JSON.stringify(treeJSON, null, 2), "utf8");

console.log("✅ docs/structure.md и structure.json успешно обновлены!");
