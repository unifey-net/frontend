import React from "react";
import "../assets/scss/pages/home.scss"
import { Button } from "antd"
import { themeDark, themeLight } from "../redux/action";
import { useDispatch } from "react-redux";

export default function Home() {
    return (
        <div className="home-container">
            <div className="head">
                <h1 className="title">Unifey</h1>
            </div>

            <div className="section-container">
                <div className="section">
                    <h2>What is Unifey?</h2>
                    <p>
                        Unifey is a general purpose social-media platform,
                        dedicated to freely exchange ideas.
                    </p>
                </div>

                <div className="section">
                    <h2>How can I learn more?</h2>
                    <p>
                        You can join our{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://discord.gg/e9wKgAt"
                        >
                            Discord
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
