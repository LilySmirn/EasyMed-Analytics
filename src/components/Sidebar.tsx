export function Sidebar() {
    return (
        <aside className="w-64 bg-gray-100 p-4 min-h-screen">
            <h2 className="font-bold mb-4">Меню</h2>
            <ul className="flex flex-col gap-2">
                <li className="hover:bg-gray-200 rounded px-2 py-1 cursor-pointer">Главная</li>
                <li className="hover:bg-gray-200 rounded px-2 py-1 cursor-pointer">Страница 1</li>
                <li className="hover:bg-gray-200 rounded px-2 py-1 cursor-pointer">Страница 2</li>
                <li className="hover:bg-gray-200 rounded px-2 py-1 cursor-pointer">Настройки</li>
            </ul>
        </aside>
    );
}
