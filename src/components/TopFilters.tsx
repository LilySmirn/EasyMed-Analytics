export function TopFilters() {
    return (
        <div className="h-16 bg-gray-200 flex items-center px-4 gap-4">
            {/* Примеры фильтров */}
            <input
                type="text"
                placeholder="Поиск..."
                className="border border-gray-400 rounded px-2 py-1"
            />
            <select className="border border-gray-400 rounded px-2 py-1">
                <option>Фильтр 1</option>
                <option>Фильтр 2</option>
                <option>Фильтр 3</option>
            </select>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Применить
            </button>
        </div>
    );
}
