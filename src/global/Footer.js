import React from "react";

export default function Footer() {
    return (
        <div className="footer">
            <p>Unifey ©{new Date().getFullYear()} — <a href="/tos">TOS</a></p>
        </div>
    );
}
