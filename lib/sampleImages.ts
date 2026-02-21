// Sample plant leaf images for demonstration
export interface SampleImage {
    id: string
    name: string
    type: 'healthy' | 'diseased'
    disease?: string
    description: string
    // Using placeholder service for demo - replace with actual images in production
    url: string
}

export const sampleImages: SampleImage[] = [
    {
        id: 'healthy-1',
        name: 'Healthy Tomato Leaf',
        type: 'healthy',
        description: 'Vibrant green leaf with no visible damage',
        url: 'https://placehold.co/400x400/22c55e/ffffff?text=Healthy+Leaf'
    },
    {
        id: 'healthy-2',
        name: 'Healthy Potato Leaf',
        type: 'healthy',
        description: 'Fresh green leaf showing normal growth',
        url: 'https://placehold.co/400x400/16a34a/ffffff?text=Healthy+Potato'
    },
    {
        id: 'early-blight',
        name: 'Early Blight',
        type: 'diseased',
        disease: 'Early Blight',
        description: 'Dark spots with concentric rings on leaf',
        url: 'https://placehold.co/400x400/dc2626/ffffff?text=Early+Blight'
    },
    {
        id: 'late-blight',
        name: 'Late Blight',
        type: 'diseased',
        disease: 'Late Blight',
        description: 'Water-soaked lesions with white mold',
        url: 'https://placehold.co/400x400/991b1b/ffffff?text=Late+Blight'
    },
    {
        id: 'leaf-mold',
        name: 'Leaf Mold',
        type: 'diseased',
        disease: 'Leaf Mold',
        description: 'Yellow patches with olive-green mold',
        url: 'https://placehold.co/400x400/ea580c/ffffff?text=Leaf+Mold'
    },
    {
        id: 'septoria',
        name: 'Septoria Leaf Spot',
        type: 'diseased',
        disease: 'Septoria Leaf Spot',
        description: 'Small circular spots with gray centers',
        url: 'https://placehold.co/400x400/b91c1c/ffffff?text=Septoria'
    },
    {
        id: 'spider-mites',
        name: 'Spider Mites',
        type: 'diseased',
        disease: 'Spider Mites',
        description: 'Stippled appearance with fine webbing',
        url: 'https://placehold.co/400x400/c2410c/ffffff?text=Spider+Mites'
    },
    {
        id: 'mosaic-virus',
        name: 'Mosaic Virus',
        type: 'diseased',
        disease: 'Mosaic Virus',
        description: 'Mottled yellow and green pattern',
        url: 'https://placehold.co/400x400/ca8a04/ffffff?text=Mosaic+Virus'
    }
]

// Simulate CNN prediction based on sample image
export function predictDisease(imageId: string): {
    class: string
    confidence: number
    isHealthy: boolean
} {
    const image = sampleImages.find(img => img.id === imageId)

    if (!image) {
        return {
            class: 'Unknown',
            confidence: 0.5,
            isHealthy: false
        }
    }

    if (image.type === 'healthy') {
        return {
            class: 'Healthy',
            confidence: 0.92 + Math.random() * 0.07, // 92-99%
            isHealthy: true
        }
    }

    return {
        class: image.disease || 'Unknown Disease',
        confidence: 0.85 + Math.random() * 0.14, // 85-99%
        isHealthy: false
    }
}
