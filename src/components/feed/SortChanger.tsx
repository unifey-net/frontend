import React, { useEffect } from "react"
import { useState } from "react"
import LinkButton from "../LinkButton"

/**
 * Handles the sort changing. (for feeds)
 */
const useSortChanger = (
    defaultSort: "NEW" | "TOP" | "OLD",
    onSortChange?: (newSort: string) => void
): ["NEW" | "TOP" | "OLD", () => void] => {
    const [sort, setSort] = useState(defaultSort)
    const [prevSort, setPrevSort] = useState(defaultSort)

    useEffect(() => {
        setPrevSort(sort)
        if (onSortChange && prevSort !== sort) {
            onSortChange(sort)
        }
    }, [sort, onSortChange, prevSort])

    const onChange = () => {
        switch (sort) {
            case "NEW":
                setSort("OLD")
                break
            case "OLD":
                setSort("TOP")
                break
            case "TOP":
                setSort("NEW")
                break
        }
    }

    return [sort, onChange]
}

export default useSortChanger