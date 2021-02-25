import React from "react"
import { Rect } from "react-konva"

type BoardProps = {
    width: number
    height: number
    color: string
}

export default ({ width, height, color }: BoardProps) => {
    return <Rect x={0} y={0} height={height} width={width} fill={color} />
}
