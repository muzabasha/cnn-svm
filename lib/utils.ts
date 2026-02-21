import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateHeatmapColor(value: number, min: number, max: number): string {
    const normalized = (value - min) / (max - min)
    const hue = (1 - normalized) * 240
    return `hsl(${hue}, 70%, 50%)`
}
