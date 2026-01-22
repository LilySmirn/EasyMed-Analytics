// Считает правый фильтр (например 100% - факт) и возвращает value

export function calcRightFilter(factValue: number, planValue?: number): number {
    if (planValue != null && planValue !== 0) {
        return Math.round(planValue - factValue);
    }
    // Если плана нет, считаем как 100% - факт
    return 100 - factValue;
}
