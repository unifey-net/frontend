import React from "react"

type LinkProps = {
    link: string,
    children: JSX.Element[]
}

export default ({ link, children }: LinkProps) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={link}>
            {children}
        </a>
    )
}
