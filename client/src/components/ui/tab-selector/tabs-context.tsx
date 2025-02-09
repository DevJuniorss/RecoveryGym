import { useRouter, useSearchParams } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface Tab {
  id: string
  label: string
  icon: React.ElementType
}

interface TabsProviderProps {
  children?: ReactNode
  tabs: Tab[]
}

interface TabsContextType {
  tabs: Tab[]
  selectedTab: string
  setSelectedTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType>({} as TabsContextType)

export const useTabsContext = () => useContext(TabsContext)

export default function TabsProvider({ tabs, children }: TabsProviderProps) {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Verifica se há um parâmetro na URL para a aba
    const tabFromUrl = searchParams.get('tab')
    if (tabFromUrl && tabs.some((tab) => tab.id === tabFromUrl)) {
      setSelectedTab(tabFromUrl)
    }
  }, [searchParams, tabs])

  const handleSetSelectedTab = (tabId: string) => {
    setSelectedTab(tabId)
    router.push(`?tab=${tabId}`) // Atualiza a URL de forma 'shallow'
  }

  return (
    <TabsContext.Provider
      value={{ tabs, selectedTab, setSelectedTab: handleSetSelectedTab }}
    >
      {children}
    </TabsContext.Provider>
  )
}
