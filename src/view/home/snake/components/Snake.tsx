import React from "react"
import { Rect } from "react-konva"

type SnakeProps = {
    x: number
    y: number
    color: string
}

export default ({ x, y, color }: SnakeProps) => {
    return <Rect x={x} y={y} width={10} height={10} fill={color} />
}
