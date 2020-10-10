import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export default (defaultTab: string = "1"): [string, (tab: string) => void] => {
    const history = useHistory()
    const [activeTab, setActiveTab] = useState(defaultTab)

    const setTab = (tab: string | null, changeHistory: boolean) => {
        const params = new URLSearchParams()

        const validTabs = ["1", "2", "3"]

        if (tab !== null && validTabs.includes(tab)) {
            params.append("tab", tab)
            setActiveTab(tab)
        } else {
            params.delete("tab")
        }

        if (changeHistory) history.push({ search: params.toString() })
    }

    useEffect(() => {
        let tab = new URL(window.location.toString()).searchParams.get("tab")

        setTab(tab, false)
    }, [])

    return [activeTab, (tab: string) => setTab(tab, true)]
}
