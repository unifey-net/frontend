import React from "react"
import { Link } from "react-router-dom"

export default () => {
    return (
        <div className="flex flex-col items-center mx-64">
            <h1 className="text-6xl">Unifey Support</h1>
            <p>
                At the moment, you can contact us through our
                <Link to="/discord"> Discord</Link>.
            </p>
        </div>
    )
}
