'use client'

import { Card } from '@/components/ui/card'

interface Task {
    id: string
    title: string
    description: string
    icon: string
}

const tasks: Task[] = [
    {
        id: 'embeddings',
        title: 'Word Embeddings',
        description: 'Word2Vec, GloVe, and semantic spaces',
        icon: '🔤'
    },
    {
        id: 'attention',
        title: 'Attention Mechanism',
        description: 'Self-attention and multi-head attention',
        icon: '👁️'
    },
    {
        id: 'transformer',
        title: 'Transformer Architecture',
        description: 'Encoder-decoder and BERT/GPT models',
        icon: '🤖'
    },
    {
        id: 'tokenization',
        title: 'Tokenization',
        description: 'BPE, WordPiece, and subword tokenization',
        icon: '✂️'
    },
    {
        id: 'seq2seq',
        title: 'Sequence-to-Sequence',
        description: 'Translation and text generation',
        icon: '🔄'
    },
    {
        id: 'sentiment',
        title: 'Sentiment Analysis',
        description: 'Text classification and emotion detection',
        icon: '😊'
    }
]

interface NLPTaskSelectorProps {
    selectedTask: string
    onSelectTask: (taskId: string) => void
}

export function NLPTaskSelector({ selectedTask, onSelectTask }: NLPTaskSelectorProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className={`p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg active:scale-98 ${selectedTask === task.id
                            ? 'ring-2 ring-indigo-500 bg-indigo-50'
                            : 'hover:bg-gray-50'
                        }`}
                    onClick={() => onSelectTask(task.id)}
                >
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{task.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                        {task.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                        {task.description}
                    </p>
                </Card>
            ))}
        </div>
    )
}
