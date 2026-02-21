import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'secondary' | 'outline'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        return (
            <button
                className={cn(
                    'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2':
                            variant === 'default',
                        'bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2':
                            variant === 'secondary',
                        'border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2':
                            variant === 'outline',
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button }
