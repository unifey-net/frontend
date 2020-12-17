import React from "react"
import { BASE_URL, VERSION } from "../api/ApiHandler"
import { Link } from "react-router-dom"

export default (): JSX.Element => {
    return (
        <footer className="footer">
            <p>
                Unifey ©{new Date().getFullYear()} — <Link to="/tos">TOS</Link>{" "}
                — <Link to="/privacy">Privacy</Link> — {VERSION} — {BASE_URL}
            </p>
        </footer>
    )
}
