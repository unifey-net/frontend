import React from "react";
import "../assets/scss/pages/about.scss"

export default function About() {
    return (
        <div className="about-container">
            <div>
                <h1>About Unifey</h1>
                <p className="about-message">
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
            </div>
        </div>
    );
}
