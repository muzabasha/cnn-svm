'use client'

import { useState } from 'react'
import { NLPTaskSelector } from '@/components/nlp/NLPTaskSelector'
import { EnhancedNLPTraining } from '@/components/nlp/EnhancedNLPTraining'
import { WordEmbeddings } from '@/components/nlp/WordEmbeddings'
import { AttentionMechanism } from '@/components/nlp/AttentionMechanism'
import { TransformerArchitecture } from '@/components/nlp/TransformerArchitecture'
import { TokenizationModule } from '@/components/nlp/TokenizationModule'
import { SequenceToSequence } from '@/components/nlp/SequenceToSequence'
import { SentimentAnalysis } from '@/components/nlp/SentimentAnalysis'

export default function NLPPage() {
    const [selectedTask, setSelectedTask] = useState('training')

    const renderTask = () => {
        switch (selectedTask) {
            case 'training':
                return <EnhancedNLPTraining />
            case 'embeddings':
                return <WordEmbeddings />
            case 'attention':
                return <AttentionMechanism />
            case 'transformer':
                return <TransformerArchitecture />
            case 'tokenization':
                return <TokenizationModule />
            case 'seq2seq':
                return <SequenceToSequence />
            case 'sentiment':
                return <SentimentAnalysis />
            default:
                return <EnhancedNLPTraining />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        NLP & Language Models Virtual Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Explore Natural Language Processing and modern language models interactively
                    </p>
                </div>

                <NLPTaskSelector
                    selectedTask={selectedTask}
                    onSelectTask={setSelectedTask}
                />

                <div className="mt-6 sm:mt-8">
                    {renderTask()}
                </div>
            </div>
        </div>
    )
}
