import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "antd"

const { Text } = Typography

export default function Support() {
    return (<div className="info-container">
        <h1>Unifey Support</h1>
        <p>At the moment, you can contact us through our <Link to="/discord">Discord</Link> to receive help with your issues. In the future this will be expanded to <Text copyable>support@unifey.net</Text>.</p>
    </div>)
}