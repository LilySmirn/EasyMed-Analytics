// Считает правый фильтр (например 100% - факт) и возвращает value

export function calcRightFilter(
    factValue: number,
    planValue?: number
) {
    if (planValue != null && planValue !== 0) {
        return {
            percent: Math.round(100 - (factValue / planValue) * 100),
            count: planValue - factValue,
        };
    }

    return { percent: 0, count: 0 };
}

