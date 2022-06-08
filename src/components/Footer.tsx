import React from "react"
import { VERSION } from "../api/ApiHandler"
import { Link } from "react-router-dom"

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>
                Unifey ©{new Date().getFullYear()} — <Link to="/tos">TOS</Link>{" "}
                / <Link to="/privacy">Privacy</Link>{" "}
                <span className="text-xs text-gray-700">({VERSION})</span>
            </p>
        </footer>
    )
}

export default Footer
