import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

/**
 * Instead of storing ant.design tab's state within a react state, this stores it within query parameters.
 */
export default (defaultTab: string = "1"): [string, (tab: string) => void] => {
    const history = useHistory()
    const [activeTab, setActiveTab] = useState(defaultTab)

    const setTab = useCallback(
        (tab: string | null, changeHistory: boolean) => {
            const params = new URLSearchParams()

            const validTabs = ["1", "2", "3", "4"]

            if (tab !== null && validTabs.includes(tab)) {
                params.append("tab", tab)
                setActiveTab(tab)
            } else {
                params.delete("tab")
            }

            if (changeHistory) history.push({ search: params.toString() })
        },
        [history]
    )

    useEffect(() => {
        let tab = new URL(window.location.toString()).searchParams.get("tab")

        setTab(tab, false)
    }, [setTab])

    return [activeTab, (tab: string) => setTab(tab, true)]
}
