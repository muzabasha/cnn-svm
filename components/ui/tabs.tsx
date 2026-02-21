import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsProps {
    defaultValue: string
    children: React.ReactNode
    className?: string
}

interface TabsListProps {
    children: React.ReactNode
    className?: string
}

interface TabsTriggerProps {
    value: string
    children: React.ReactNode
    className?: string
}

interface TabsContentProps {
    value: string
    children: React.ReactNode
    className?: string
}

const TabsContext = React.createContext<{
    value: string
    setValue: (value: string) => void
}>({ value: '', setValue: () => { } })

export function Tabs({ defaultValue, children, className }: TabsProps) {
    const [value, setValue] = React.useState(defaultValue)

    return (
        <TabsContext.Provider value={{ value, setValue }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    )
}

export function TabsList({ children, className }: TabsListProps) {
    return (
        <div
            className={cn(
                'inline-flex h-10 items-center justify-center rounded-xl bg-gray-100 p-1',
                className
            )}
        >
            {children}
        </div>
    )
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
    const { value: selectedValue, setValue } = React.useContext(TabsContext)
    const isSelected = selectedValue === value

    return (
        <button
            onClick={() => setValue(value)}
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                isSelected
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900',
                className
            )}
        >
            {children}
        </button>
    )
}

export function TabsContent({ value, children, className }: TabsContentProps) {
    const { value: selectedValue } = React.useContext(TabsContext)

    if (selectedValue !== value) return null

    return <div className={cn('mt-2', className)}>{children}</div>
}
