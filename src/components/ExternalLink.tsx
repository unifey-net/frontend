import React from "react"

type LinkProps = {
    link: string
    children: string
}

/**
 * A link that's not on Unifey to open in a blank tab.
 */
export default ({ link, children }: LinkProps) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={link}>
            {children}
        </a>
    )
}
