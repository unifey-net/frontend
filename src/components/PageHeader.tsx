import React from "react"

/**
 * A page's main header.
 */
const PageHeader: React.FC = ({ children }) => {
    return <h1 className="text-2xl md:text-3xl lg:text-6xl">{children}</h1>
}

export default PageHeader