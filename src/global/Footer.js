import React from "react";
import './footer.css'

function Footer() {
    return (
        <div className="footer">
            <p>Unifey ©{new Date().getFullYear()} — <a href="/tos">TOS</a></p>
        </div>
    );
}

export default Footer;
