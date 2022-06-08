import React, { useEffect, useState } from "react"
import { Button } from "antd"
import Modal from "antd/lib/modal/Modal"
import useSnake from "./useSnake"

const Snake: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [modal, setModal] = useState(false)
    const [snake, status, score, restart] = useSnake()
    const [keyCodes, setKeyCodes] = useState([] as any)

    useEffect(() => {
        const tick = (event: KeyboardEvent) => {
            setKeyCodes((prev: any) => [...prev, event.keyCode])
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
                setVisible(true)
            }
        }
    }, [keyCodes])

    return (
        <>
            {visible && (
                <>
                    <Button onClick={() => setModal(prev => !prev)}>
                        Snake
                    </Button>

                    <Modal
                        visible={modal}
                        footer={null}
                        onCancel={() => setModal(false)}
                        centered
                        width={300}
                    >
                        <div className="flex flex-row justify-evenly">
                            <h1 className="text-lg">
                                {status.gameOver && <p>Game Over!</p>}{" "}
                                {!status.gameOver && !status.paused && (
                                    <p>Score: {score}</p>
                                )}
                                {status.paused && (
                                    <p>Paused (space to unpause)</p>
                                )}
                            </h1>
                            {status.gameOver && (
                                <Button onClick={restart}>Restart</Button>
                            )}
                        </div>

                        <div className="flex flex-row items-center justify-center">
                            {snake}
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}

export default Snake
