import React from "react"

type Props = {
    date: number
}

export default ({ date }: Props): JSX.Element => {
    return (
        <span className="invisible lg:visible">
            Posted on {new Date(date).toLocaleString()}
        </span>
    )
}
