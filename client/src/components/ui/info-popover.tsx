import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/popover'
import { Info } from '@phosphor-icons/react/dist/ssr'

interface InfoPopoverProps {
  text: string
}

export default function InfoPopover({ text }: InfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Info size={20} />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <span className="text-sm">{text}</span>
      </PopoverContent>
    </Popover>
  )
}
