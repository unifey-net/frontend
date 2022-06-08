import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

/**
 * Instead of storing ant.design tab's state within a react state, this stores it within query parameters.
 */
const useQueryParameterTabs = (
    defaultTab: string = "1"
): [string, (tab: string) => void] => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || defaultTab)

    return [activeTab, (tab: string) => {
        setActiveTab(tab)
        setSearchParams({ tab })
    }]
}

export default useQueryParameterTabs
