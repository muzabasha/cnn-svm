// Real plant leaf images from public sources
export interface SampleImage {
    id: string
    name: string
    type: 'healthy' | 'diseased'
    disease?: string
    description: string
    url: string
}

export const sampleImages: SampleImage[] = [
    {
        id: 'healthy-1',
        name: 'Healthy Tomato Leaf',
        type: 'healthy',
        description: 'Vibrant green leaf with no visible damage',
        url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=400&fit=crop&q=80'
    },
    {
        id: 'healthy-2',
        name: 'Healthy Plant Leaf',
        type: 'healthy',
        description: 'Fresh green leaf showing normal growth',
        url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&q=80'
    },
    {
        id: 'early-blight',
        name: 'Early Blight',
        type: 'diseased',
        disease: 'Early Blight',
        description: 'Dark spots with concentric rings on leaf',
        url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop&q=80'
    },
    {
        id: 'late-blight',
        name: 'Late Blight',
        type: 'diseased',
        disease: 'Late Blight',
        description: 'Water-soaked lesions and browning',
        url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&q=80'
    },
    {
        id: 'leaf-mold',
        name: 'Leaf Mold',
        type: 'diseased',
        disease: 'Leaf Mold',
        description: 'Yellow patches with mold growth',
        url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=400&fit=crop&q=80'
    },
    {
        id: 'septoria',
        name: 'Septoria Leaf Spot',
        type: 'diseased',
        disease: 'Septoria Leaf Spot',
        description: 'Small circular spots with gray centers',
        url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop&q=80'
    },
    {
        id: 'spider-mites',
        name: 'Spider Mites Damage',
        type: 'diseased',
        disease: 'Spider Mites',
        description: 'Stippled appearance and discoloration',
        url: 'https://images.unsplash.com/photo-1597848212624-e530bb4d4239?w=400&h=400&fit=crop&q=80'
    },
    {
        id: 'mosaic-virus',
        name: 'Mosaic Virus',
        type: 'diseased',
        disease: 'Mosaic Virus',
        description: 'Mottled yellow and green pattern',
        url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop&q=80'
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
