import React, { useState } from "react"
import { Button } from "antd"
import Modal from "antd/lib/modal/Modal"
import useSnake from "./useSnake"

export default () => {
    const [visible, setVisible] = useState(false)
    const [snake, status, score, restart] = useSnake()
    
    return (
        <>
            <Button onClick={() => setVisible((prev) => !prev)}>Snake</Button>

            <Modal
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
                centered
                width={300}
            >
                <div className="flex flex-row justify-evenly">
                    <h1 className="text-lg">
                        {status.gameOver && <p>Game Over!</p>}{" "}
                        {!status.gameOver && !status.paused && (
                            <p>Score: {score}</p>
                        )}
                        {status.paused && <p>Paused (space to unpause)</p>}
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
    );
}