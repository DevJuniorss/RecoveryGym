import { cn } from '@/lib/utils'

interface ContainerProps {
  children?: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('h-screen overflow-y-auto px-8 pb-4', className)}>
      {children}
    </div>
  )
}
