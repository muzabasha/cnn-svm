# Weather Pattern Recognition Module - Part 1

## File: `components/rnn/WeatherPatternRecognition.tsx`

Copy this complete code into the file:

```typescript
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

// Weather sequences for prediction
const weatherSequences = [
    {
        id: 'sunny-to-rain',
        name: 'Sunny to Rainy',
        sequence: ['sunny', 'sunny', 'cloudy', 'cloudy', 'rain'],
        icon: '🌦️',
        description: 'Gradual transition from clear to rainy weather',
        prediction: 'rain'
    },
    {
        id: 'rain-to-sunny',
        name: 'Rainy to Sunny',
        sequence: ['rain', 'rain', 'cloudy', 'sunny', 'sunny'],
        icon: '🌤️',
        description: 'Weather clearing up after rain',
        prediction: 'sunny'
    },
    {
        id: 'cloudy-cycle',
        name: 'Cloudy Cycle',
        sequence: ['cloudy', 'rain', 'cloudy', 'sunny', 'cloudy'],
        icon: '☁️',
        description: 'Cyclical cloudy weather pattern',
        prediction: 'cloudy'
    },
    {
        id: 'winter-storm',
        name: 'Winter Storm',
        sequence: ['cloudy', 'cloudy', 'snow', 'snow', 'cloudy'],
        icon: '❄️',
        description: 'Cold weather with snow',
        prediction: 'snow'
    }
]

type ProcessingStep = 'input' | 'embedding' | 'rnn1' | 'rnn2' | 'rnn3' | 'hidden' | 'output'

interface LayerData {
    step: ProcessingStep
    name: string
    operation: string
    inputShape: string
    outputShape: string
