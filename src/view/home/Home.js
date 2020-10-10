import React, { useState, useEffect } from "react"
import SnakeModal from "./snake/SnakeModal"

export default function Home() {
    const [keyCodes, setKeyCodes] = useState([])
    const [snake, setSnake] = useState(false)

    useEffect(() => {
        const tick = event => {
            setKeyCodes(prev => [...prev, event.keyCode])
        }

        window.addEventListener("keydown", tick, false)

        return () => window.removeEventListener("keydown", tick, false)
    }, [])

    useEffect(() => {
        if (keyCodes.length > 4) {
            setKeyCodes([])

            if (
                JSON.stringify(keyCodes) ===
                JSON.stringify([83, 78, 65, 75, 69])
            ) {
                setSnake(true)
            }
        }
    }, [keyCodes])

    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <img src="/homepage.png"></img>
            </div>

            <div className="flex flex-row gap-8">
                <div>
                    <h2 className="text-lg">What is Unifey?</h2>
                    <p className="break-words max-w-xs">
                        Unifey is an open source social-media platform,
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
                            {" "}
                            Discord
                        </a>
                        .
                    </p>
                </div>
            </div>

            {snake && <SnakeModal />}
        </div>
    )
}
