import React from "react";
import { VERSION, CLIENT } from "../api/ApiHandler";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <p>
                Unifey ©{new Date().getFullYear()} — <Link to="/tos">TOS</Link> —{" "}
                {VERSION}
            </p>
        </footer>
    );
}
