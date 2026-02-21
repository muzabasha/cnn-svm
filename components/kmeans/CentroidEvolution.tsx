'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BlockMath } from 'react-katex'

export function CentroidEvolution() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Centroid Evolution</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Track how centroids move during K-means iterations to minimize within-cluster variance.
                    </p>

                    <div className="bg-cyan-50 p-4 rounded-lg mb-4 overflow-x-auto">
                        <p className="text-sm font-semibold text-cyan-900 mb-2">Centroid Update Formula:</p>
                        <BlockMath math="\mu_k = \frac{1}{|C_k|}\sum_{x_i \in C_k} x_i" />
                        <p className="text-xs text-cyan-700 mt-2">Mean of all points assigned to cluster k</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Initialization</h4>
                            <p className="text-sm text-blue-700">Centroids start at random positions</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">Convergence</h4>
                            <p className="text-sm text-green-700">Centroids stabilize when assignments don't change</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
