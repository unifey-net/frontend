import React from "react"

type Props = {
    children: string
}

/**
 * A page's main header.
 */
export default ({ children }: Props) => {
    return <h1 className="text-2xl md:text-3xl lg:text-6xl">{children}</h1>
}
