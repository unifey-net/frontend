import React from "react";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <h1 className="text-6xl">Unifey</h1>
            </div>

            <div className="flex flex-row gap-8">
                <div>
                    <h2 className="text-lg">What is Unifey?</h2>
                    <p className="break-words max-w-xs">
                        Unifey is a general purpose social-media platform,
                        dedicated to freely exchange ideas.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg">How can I learn more?</h2>
                    <p className="break-words max-w-xs">
                        You can join our
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
