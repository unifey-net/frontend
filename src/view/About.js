import React from "react";
import { Link } from "react-router-dom"
import "../assets/scss/pages/info.scss"

export default function About() {
    return (
        <div className="info-container">
            <div>
                <h1>About Unifey</h1>
                <p>
                    If you'd like to learn more about us, or what we're doing,
                    join our{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://discord.gg/e9wKgAt"
                    >
                        Discord
                    </a>
                    .
                </p>

                <h1>Can I view Unifey's code?</h1>
                <p>
                    Yes. Unifey's frontend and backend are open-source, and
                    available to view at our{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/unifey-net"
                    >
                        GitHub
                    </a>
                    .
                </p>

                <h1>Want to reserve a name for the future in Unifey?</h1>
                <p>
                    You can reserve a name{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://forms.gle/sD1Jq2XqRuBaSncp9"
                    >
                        here
                    </a>
                    .
                </p>

                <h1>I need help with something Unifey related</h1>
                <p>For more information on how to contact us, visit our <Link to="/support">support</Link> page.</p>
            </div>
        </div>
    );
}
