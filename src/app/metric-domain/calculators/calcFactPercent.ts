// Превращает raw fact/plan значения в проценты для первого бара

export function calcFactPercent(factValue: number, planValue?: number): number {
    if (planValue == null || planValue === 0) {
        // Если плана нет, просто возвращаем фактическое значение как процент
        return factValue;
    }
    // Факт / план * 100
    return Math.round((factValue / planValue) * 100);
}
