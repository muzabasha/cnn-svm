'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { generateHeatmapColor } from '@/lib/utils'
import { Play, RefreshCw } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export function ConvolutionModule() {
    const [image, setImage] = useState<number[][]>([
        [1, 2, 0, 0, 1],
        [3, 1, 2, 1, 0],
        [0, 1, 3, 1, 2],
        [2, 0, 1, 2, 1],
        [1, 2, 1, 0, 0]
    ])

    const [kernel, setKernel] = useState<number[][]>([
        [1, 0, -1],
        [1, 0, -1],
        [1, 0, -1]
    ])

    const [output, setOutput] = useState<number[][]>([])
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [stride, setStride] = useState(1)
    const [padding, setPadding] = useState(0)

    const computeConvolution = () => {
        const paddedImage = addPadding(image, padding)
        const outputSize = Math.floor((paddedImage.length - kernel.length) / stride) + 1
        const result: number[][] = []

        for (let i = 0; i < outputSize; i++) {
            result[i] = []
            for (let j = 0; j < outputSize; j++) {
                let sum = 0
                for (let m = 0; m < kernel.length; m++) {
                    for (let n = 0; n < kernel[0].length; n++) {
                        sum += paddedImage[i * stride + m][j * stride + n] * kernel[m][n]
                    }
                }
                result[i][j] = sum
            }
        }
        setOutput(result)
    }

    const addPadding = (img: number[][], pad: number): number[][] => {
        if (pad === 0) return img
        const newSize = img.length + 2 * pad
        const padded: number[][] = Array(newSize).fill(0).map(() => Array(newSize).fill(0))
        for (let i = 0; i < img.length; i++) {
            for (let j = 0; j < img[0].length; j++) {
                padded[i + pad][j + pad] = img[i][j]
            }
        }
        return padded
    }

    useEffect(() => {
        computeConvolution()
    }, [image, kernel, stride, padding])

    const animate = () => {
        setIsAnimating(true)
        setCurrentStep(0)
        const maxSteps = output.length * output[0].length
        let step = 0
        const interval = setInterval(() => {
            step++
            setCurrentStep(step)
            if (step >= maxSteps) {
                clearInterval(interval)
                setIsAnimating(false)
            }
        }, 800)
    }

    const resetImage = () => {
        setImage([
            [1, 2, 0, 0, 1],
            [3, 1, 2, 1, 0],
            [0, 1, 3, 1, 2],
            [2, 0, 1, 2, 1],
            [1, 2, 1, 0, 0]
        ])
    }

    const getCurrentPosition = () => {
        if (!isAnimating || currentStep === 0) return null
        const step = currentStep - 1
        const cols = output[0].length
        return {
            row: Math.floor(step / cols),
            col: step % cols
        }
    }

    const pos = getCurrentPosition()

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Convolution Operation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">
                        Learn how convolution extracts features from images using kernels.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <h3 className="font-semibold text-blue-900 mb-2">Mathematical Formula</h3>
                        <div className="bg-white p-4 rounded-lg">
                            <BlockMath math="Y(i,j) = \sum_{m=0}^{k-1} \sum_{n=0}^{k-1} X(i+m,j+n) \cdot K(m,n)" />
                        </div>
                        <div className="mt-3 space-y-1 text-sm text-gray-700">
                            <p><InlineMath math="Y(i,j)" /> = Output value at position (i,j)</p>
                            <p><InlineMath math="X(i+m,j+n)" /> = Input pixel value</p>
                            <p><InlineMath math="K(m,n)" /> = Kernel weight</p>
                            <p><InlineMath math="k" /> = Kernel size</p>
                        </div>
                    </div>

                    <Tabs defaultValue="visual">
                        <TabsList>
                            <TabsTrigger value="visual">Visual</TabsTrigger>
                            <TabsTrigger value="code">Python Code</TabsTrigger>
                            <TabsTrigger value="parameters">Parameters</TabsTrigger>
                        </TabsList>

                        <TabsContent value="visual">
                            <div className="grid grid-cols-3 gap-6 mt-4">
                                <div>
                                    <h3 className="font-semibold mb-3 text-center">Input Image (5×5)</h3>
                                    <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(5, 1fr)` }}>
                                        {image.map((row, i) =>
                                            row.map((val, j) => {
                                                const isHighlighted = pos &&
                                                    i >= pos.row * stride && i < pos.row * stride + kernel.length &&
                                                    j >= pos.col * stride && j < pos.col * stride + kernel[0].length
                                                return (
                                                    <div
                                                        key={`${i}-${j}`}
                                                        className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-semibold transition-all ${isHighlighted ? 'border-blue-500 bg-blue-100 scale-110' : 'border-gray-300'
                                                            }`}
                                                        style={{ backgroundColor: isHighlighted ? undefined : generateHeatmapColor(val, 0, 3) }}
                                                    >
                                                        {val}
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3 text-center">Kernel (3×3)</h3>
                                    <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(3, 1fr)` }}>
                                        {kernel.map((row, i) =>
                                            row.map((val, j) => (
                                                <div
                                                    key={`${i}-${j}`}
                                                    className="w-12 h-12 flex items-center justify-center border-2 border-purple-300 rounded-lg font-semibold bg-purple-50"
                                                >
                                                    {val}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 text-center">Edge detection kernel</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3 text-center">Output ({output.length}×{output[0]?.length || 0})</h3>
                                    {output.length > 0 && (
                                        <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${output[0].length}, 1fr)` }}>
                                            {output.map((row, i) =>
                                                row.map((val, j) => {
                                                    const isActive = pos && pos.row === i && pos.col === j
                                                    return (
                                                        <div
                                                            key={`${i}-${j}`}
                                                            className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-semibold transition-all ${isActive ? 'border-green-500 bg-green-100 scale-110' : 'border-gray-300'
                                                                }`}
                                                            style={{ backgroundColor: isActive ? undefined : generateHeatmapColor(val, -6, 6) }}
                                                        >
                                                            {val}
                                                        </div>
                                                    )
                                                })
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button onClick={animate} disabled={isAnimating}>
                                    <Play className="w-4 h-4 mr-2" />
                                    Animate
                                </Button>
                                <Button variant="outline" onClick={resetImage}>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Reset
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="code">
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                                <pre>{`import numpy as np

# Input image
image = np.array([
  [1, 2, 0, 0, 1],
  [3, 1, 2, 1, 0],
  [0, 1, 3, 1, 2],
  [2, 0, 1, 2, 1],
  [1, 2, 1, 0, 0]
])

# Edge detection kernel
kernel = np.array([
  [1, 0, -1],
  [1, 0, -1],
  [1, 0, -1]
])

# Convolution operation
output = []
for i in range(image.shape[0] - kernel.shape[0] + 1):
    row = []
    for j in range(image.shape[1] - kernel.shape[1] + 1):
        # Element-wise multiplication and sum
        patch = image[i:i+3, j:j+3]
        value = np.sum(patch * kernel)
        row.append(value)
    output.append(row)

print(output)
# Result: Feature map highlighting vertical edges`}</pre>
                            </div>
                        </TabsContent>

                        <TabsContent value="parameters">
                            <div className="space-y-6 max-w-md">
                                <Slider
                                    label="Stride"
                                    value={stride}
                                    onChange={setStride}
                                    min={1}
                                    max={2}
                                    step={1}
                                    description="How many pixels to move the kernel"
                                />
                                <Slider
                                    label="Padding"
                                    value={padding}
                                    onChange={setPadding}
                                    min={0}
                                    max={2}
                                    step={1}
                                    description="Zero padding around the image"
                                />
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-yellow-900 mb-2">Try This</h4>
                                    <p className="text-sm text-gray-700">
                                        Change stride to 2. What happens to output size?
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
