import React from "react"

/**
 * A link that's not on Unifey to open in a blank tab.
 */
const ExternalLink: React.FC<{ link: string; children?: React.ReactNode }> = ({
    link,
    children,
}) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={link}>
            {children}
        </a>
    )
}

export default ExternalLink
