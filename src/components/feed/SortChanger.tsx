import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeSort, feedClear } from "../../redux/actions/feeds.actions"
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
const useSortChanger = (defaultSort: "NEW" | "TOP" | "OLD", id: string): [string, JSX.Element] => {
    const [sort, setSort] = useState(defaultSort)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(changeSort({ sort, id }))
        dispatch(feedClear(id))
    }, [sort, dispatch, id])

    const onChange = () => {
        switch (sort) {
            case "NEW":
                setSort("OLD")
                break;
            case "OLD":
                setSort("TOP")
                break;
            case "TOP":
                setSort("NEW")
                break;
        }
    }

    return [sort, <SortChanger sort={sort} onChange={onChange} />]
}

export default useSortChanger