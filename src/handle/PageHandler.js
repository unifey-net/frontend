import React from "react"
import { useRouteMatch } from "react-router-dom"
import NotFound from "../NotFound";

const getPage = page => {
    const component = () => require(`../pages/${page}`).default
    
    try {
        return React.createElement(component())
    } catch (e) {
        return NotFound()
    }
}

export default function PageHandler() {
    const {
        params: { page }
    } = useRouteMatch()

    return getPage(page);
}
