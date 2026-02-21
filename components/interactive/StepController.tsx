'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

interface StepControllerProps {
    totalSteps: number
    currentStep: number
    onStepChange: (step: number) => void
    onPlay?: () => void
    onPause?: () => void
    onReset?: () => void
    isPlaying?: boolean
    stepDescriptions?: string[]
    autoPlaySpeed?: number
}

export function StepController({
    totalSteps,
    currentStep,
    onStepChange,
    onPlay,
    onPause,
    onReset,
    isPlaying = false,
    stepDescriptions = [],
    autoPlaySpeed = 1000
}: StepControllerProps) {
    const [speed, setSpeed] = useState(autoPlaySpeed)

    useEffect(() => {
        if (isPlaying && currentStep < totalSteps - 1) {
            const timer = setTimeout(() => {
                onStepChange(currentStep + 1)
            }, speed)
            return () => clearTimeout(timer)
        } else if (isPlaying && currentStep >= totalSteps - 1) {
            onPause?.()
        }
    }, [isPlaying, currentStep, speed, totalSteps, onStepChange, onPause])

    const handlePrevious = () => {
        if (currentStep > 0) {
            onStepChange(currentStep - 1)
        }
    }

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            onStepChange(currentStep + 1)
        }
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            onPause?.()
        } else {
            onPlay?.()
        }
    }

    const handleReset = () => {
        onStepChange(0)
        onReset?.()
    }

    return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            {/* Step Progress */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-700">
                        Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span className="text-gray-500">
                        {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step Description */}
            {stepDescriptions[currentStep] && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">{stepDescriptions[currentStep]}</p>
                </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-2">
                <Button
                    onClick={handleReset}
                    variant="outline"
                    className="px-3 py-2"
                    disabled={currentStep === 0 && !isPlaying}
                >
                    <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="px-3 py-2"
                    disabled={currentStep === 0 || isPlaying}
                >
                    <SkipBack className="w-4 h-4" />
                </Button>
                <Button
                    onClick={handlePlayPause}
                    className="flex-1 flex items-center justify-center gap-2"
                >
                    {isPlaying ? (
                        <>
                            <Pause className="w-4 h-4" />
                            Pause
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4" />
                            {currentStep === totalSteps - 1 ? 'Replay' : 'Play'}
                        </>
                    )}
                </Button>
                <Button
                    onClick={handleNext}
                    variant="outline"
                    className="px-3 py-2"
                    disabled={currentStep === totalSteps - 1 || isPlaying}
                >
                    <SkipForward className="w-4 h-4" />
                </Button>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
                <Slider
                    label="Animation Speed"
                    value={speed}
                    onChange={setSpeed}
                    min={200}
                    max={2000}
                    step={100}
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Fast (200ms)</span>
                    <span>Slow (2000ms)</span>
                </div>
            </div>
        </div>
    )
}
