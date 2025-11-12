export function getPercentColor(value: number, type: 'normal' | 'reverse' = 'normal'): string {
    if (isNaN(value)) return '';

    if (type === 'normal') {
        if (value >= 90) return 'text-green-600 font-medium';
        if (value >= 70) return 'text-yellow-600 font-medium';
        return 'text-red-600 font-medium';
    }

    // reverse logic (для "процент отклонений")
    if (value <= 10) return 'text-green-600 font-medium';
    if (value <= 30) return 'text-yellow-600 font-medium';
    return 'text-red-600 font-medium';
}
