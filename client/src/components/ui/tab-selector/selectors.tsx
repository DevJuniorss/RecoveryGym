import { useTabsContext } from './tabs-context'
import { cn } from '@/lib/utils'

export default function Selectors() {
  const { tabs, selectedTab, setSelectedTab } = useTabsContext()

  return (
    <div className="flex mt-8 border-b">
      <div className="min-w-64" />
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={cn(
              'flex items-center gap-1 px-4 text-secondary',
              selectedTab === tab.id &&
                'border-b-2 text-contrast border-primary',
            )}
          >
            <tab.icon />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
