import * as React from 'react'

interface SliderProps {
    label: string
    value: number
    onChange: (value: number) => void
    min: number
    max: number
    step: number
    description?: string
}

export function Slider({ label, value, onChange, min, max, step, description }: SliderProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <span className="text-sm font-semibold text-blue-600">{value}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            {description && (
                <p className="text-xs text-gray-500">{description}</p>
            )}
        </div>
    )
}
