import type { MetricPolarity } from "@/utils/metricPolarity";

/**
 * Декларативное описание поведения карточки метрик.
 * НЕ содержит данных и формул.
 */
export type MetricCardConfig = {
    /**
     * Уникальный идентификатор карточки
     */
    id: string;

    /**
     * Заголовок карточки
     */
    title: string;

    /**
     * Единицы измерения (шт, ₽, %, или undefined)
     */
    unit?: string;

    /**
     * Тип эталона для сравнения факта
     * plan - карточка с планом
     * ideal - сравнение со 100% (например, клинреки)
     * none - без плана
     */
    referenceType: "plan" | "ideal" | "none";

    /**
     * Отображение фактического значения
     */
    factDisplay: {
        /**
         * Показывать ли первый прогресс-бар (факт)
         */
        showBar: boolean;

        /**
         * Где показывать фактическое значение
         */
        valuePosition: "center" | "aboveBar";
    };

    /**
     * Прогресс-бары карточки
     */
    bars: {
        /**
         * Фактический прогресс-бар
         */
        fact?: {
            enabled: boolean;

            /**
             * Пороговые значения для определения цвета
             */
            thresholds?: {
                error?: number;   // красный / плохо
                warning?: number; // жёлтый / предупреждение
            };
        };

        /**
         * LFL-индикатор
         */
        lfl?: {
            enabled: boolean;

            /**
             * Полярность (normal / inverted)
             */
            polarity: MetricPolarity;
        };
    };

    /**
     * Нижние фильтры
     */
    filters: {
        /**
         * Левый фильтр (обычно LFL)
         */
        left?: {
            title: string;

            /**
             * Откуда берётся значение фильтра
             */
            source: "lfl" | "customWhenFiltered";

            polarity: MetricPolarity;
        };

        /**
         * Правый фильтр (например, отклонение)
         */
        right?: {
            title: string;

            /**
             * Показывать ли фильтр
             */
            enabled: boolean;

            /**
             * Как считается значение
             */
            value: "100minusFact";

            /**
             * Откуда берётся цвет
             */
            colorSource: "factBar";
        };
    };
};
