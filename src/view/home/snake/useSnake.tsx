import React, { useState, useEffect } from "react"
import { Stage, Layer, Rect } from "react-konva"
import Snake from "./components/Snake"
import Food from "./components/Food"

/**
 * A location on the snake board.
 */
type Location = {
    x: number
    y: number
}

/**
 * The snake game's status.
 */
type SnakeStatus = {
    location: Location[]
    direction: "RIGHT" | "LEFT" | "UP" | "DOWN"
    food: Location
    gameOver: boolean
    paused: boolean
}

const locationEquals = (l: Location, l2: Location): Boolean => {
    return l.x === l2.x && l.y === l2.y
}

/**
 * This has to be one of the most useless features i've ever added.
 * I don't know why I put so much time into learning stuff that would provide no gain.
 * but here we are, a mediocre snake.
 */
export default (): [JSX.Element, SnakeStatus, number, () => void] => {
    const [snake, setSnake] = useState(
        () =>
            ({
                location: [{ x: 120, y: 120 }],
                direction: "DOWN",
                food: {
                    x: +`${Math.floor(Math.random() * 25 + 0)}0`,
                    y: +`${Math.floor(Math.random() * 25 + 0)}0`,
                },
                gameOver: false,
                paused: true,
            } as SnakeStatus)
    )

    const [score, setScore] = useState(0)

    useEffect(() => {
        const keyDown = (event: KeyboardEvent) => {
            setSnake(prev => {
                switch (event.key) {
                    case " ": {
                        // this is space
                        return { ...prev, paused: false }
                    }
                    case "ArrowUp": {
                        if (prev.direction === "UP") break

                        return { ...prev, direction: "DOWN" }
                    }

                    case "ArrowDown": {
                        if (prev.direction === "DOWN") break

                        return { ...prev, direction: "UP" }
                    }

                    case "ArrowRight": {
                        if (prev.direction === "LEFT") break

                        return { ...prev, direction: "RIGHT" }
                    }

                    case "ArrowLeft": {
                        if (prev.direction === "RIGHT") break

                        return { ...prev, direction: "LEFT" }
                    }

                    default: {
                        return prev
                    }
                }
                return prev
            })
        }

        window.addEventListener("keydown", keyDown)

        return () => window.removeEventListener("keydown", keyDown)
    }, [])

    const tick = () => {
        setSnake(prev => {
            if (prev.gameOver || prev.paused) return prev

            let newHead = prev.location[0]
            let head = prev.location[0]

            switch (prev.direction) {
                case "DOWN": {
                    newHead = { x: head.x, y: head.y - 10 }
                    break
                }

                case "UP": {
                    newHead = { x: head.x, y: head.y + 10 }
                    break
                }

                case "RIGHT": {
                    newHead = { x: head.x + 10, y: head.y }
                    break
                }

                case "LEFT": {
                    newHead = { x: head.x - 10, y: head.y }
                    break
                }

                default: {
                    break
                }
            }

            if (
                prev.location.some(
                    loc => newHead.x === loc.x && newHead.y === loc.y
                ) ||
                newHead.x > 250 ||
                newHead.x < 0 ||
                newHead.y > 250 ||
                newHead.y < 0
            ) {
                return { ...prev, gameOver: true }
            }

            let food = prev.food

            if (locationEquals(food, head)) {
                setScore(prev => prev + 1)

                food = {
                    x: +`${Math.floor(Math.random() * 25 + 0)}0`,
                    y: +`${Math.floor(Math.random() * 25 + 0)}0`,
                }
            } else {
                prev.location.pop()
            }

            return {
                location: [newHead, ...prev.location],
                direction: prev.direction,
                food,
            } as SnakeStatus
        })
    }

    useEffect(() => {
        const interval = setInterval(tick, 100)

        return () => clearInterval(interval)
    }, [])

    return [
        <Stage height={250} width={250}>
            <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={250}
                    height={250}
                    fill={"#23202b"}
                ></Rect>
            </Layer>
            <Layer>
                {snake.location.map((location, index) => (
                    <Snake
                        x={location.x}
                        y={location.y}
                        color={index === 0 ? "yellow" : "lightgreen"}
                    />
                ))}
            </Layer>
            <Layer>
                <Food x={snake.food.x} y={snake.food.y} />
            </Layer>
        </Stage>,
        snake,
        score,
        () => {
            setSnake({
                location: [{ x: 120, y: 120 }],
                direction: "DOWN",
                food: {
                    x: +`${Math.floor(Math.random() * 25 + 0)}0`,
                    y: +`${Math.floor(Math.random() * 25 + 0)}0`,
                },
                gameOver: false,
                paused: true,
            })
        },
    ]
}
