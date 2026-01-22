// src/app/metric-domain/calculators/getVariant.ts
type Variant = "default" | "error" | "success" | "warning" | "neutral";

export interface Thresholds {
    error?: number;
    warning?: number;
}

/**
 * Возвращает variant для прогресс-бара или фильтра
 * @param value процентное значение
 * @param thresholds {error, warning} - границы для цветов
 * @param polarity normal | inverted
 */
export function getVariant(
    value?: number,
    thresholds?: Thresholds,
    polarity: "normal" | "inverted" = "normal"
): Variant {
    if (value == null || Number.isNaN(value)) return "neutral";

    const errorThreshold = thresholds?.error ?? 79.9;
    const warningThreshold = thresholds?.warning ?? 89.9;

    let result: Variant;

    if (value <= errorThreshold) result = "error";
    else if (value <= warningThreshold) result = "warning";
    else result = "default";

    // инверсия
    if (polarity === "inverted") {
        if (result === "error") result = "success";
        else if (result === "default") result = "error";
        // warning и neutral остаются без изменений
    }

    return result;
}
