// generate-structure.js
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

// Функция обхода директорий
function buildTree(dir, prefix = "") {
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
                buildTree(fullPath, nextPrefix)
            );
        } else {
            return prefix + pointer + item.name + "\n";
        }
    }).join("");
}

// Основной путь проекта
const projectDir = process.cwd();

// Генерируем дерево
const tree = ".\n" + buildTree(projectDir);

// Markdown-шаблон
const markdown = `# Полная структура проекта

Этот файл сгенерирован автоматически (см. \`generate-structure.js\`).

Ниже приведено дерево всех файлов и папок проекта:
\`\`\`text
${tree}
\`\`\`
`;

// Создаём docs/structure.md
fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/structure.md", markdown, "utf8");

console.log("✅ Файл docs/structure.md успешно создан!");
