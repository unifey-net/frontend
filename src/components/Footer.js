import React from "react";
import { VERSION } from "../api/ApiHandler";

export default function Footer() {
    return (
        <footer className="footer">
            <p>
                Unifey ©{new Date().getFullYear()} — <a href="/tos">TOS</a> —{" "}
                {VERSION}
            </p>
        </footer>
    );
}
