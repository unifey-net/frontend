import React from "react"
import { Rect } from "react-konva"

type FoodProps = {
    x: number,
    y: number
}

export default ({ x, y }: FoodProps) => {
    return <Rect x={x} y={y} width={10} height={10} fill="white" />;
}