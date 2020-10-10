import React from "react"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <div className="flex items-center justify-center">
            <div>
                <h1 className="text-4xl md:text-2xl lg:text-6xl">
                    About Unifey
                </h1>

                <h1 className="text-lg">What is Unifey for?</h1>
                <p>
                    If you'd like to learn more about us or what we're doing,
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

                <h1 className="text-lg">Can I view Unifey's code?</h1>
                <p>
                    Yes. Unifey's frontend and backend are open-source and
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

                <h1 className="text-lg">
                    Can I reserve a name for the future in Unifey?
                </h1>
                <p>
                    You can reserve a name through our Beta signup process{" "}
                    <Link to="/beta">here</Link>.
                </p>

                <h1 className="text-lg">
                    I need help with something Unifey related
                </h1>
                <p>
                    For more information on how to contact us visit our{" "}
                    <Link to="/support">support</Link> page.
                </p>
            </div>
        </div>
    )
}
