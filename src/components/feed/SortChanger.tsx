import React, { useEffect } from "react"
import { useState } from "react"
import LinkButton from "../LinkButton"

type SortChangerProps = {
    onChange: () => void
    sort: string
}

/**
 * The sort changer button.
 */
export const SortChanger: React.FC<SortChangerProps> = ({ onChange, sort }) => {
    return (
        <LinkButton onClick={() => onChange()}>
            {sort[0] + sort.substring(1).toLowerCase()}
        </LinkButton>
    )
}

/**
 * Handles the sort changing. (for feeds)
 */
const useSortChanger = (
    defaultSort: "NEW" | "TOP" | "OLD",
    onSortChange?: (newSort: string) => void
): ["NEW" | "TOP" | "OLD", JSX.Element] => {
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

    return [sort, <SortChanger sort={sort} onChange={onChange} />]
}

export default useSortChanger