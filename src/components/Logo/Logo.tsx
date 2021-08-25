import React from "react"

import Logo from "./Logo.svg"

type Props = {
    width: number
    height: number
}

export default ({ width, height }: Props) => {
    return <img src={Logo} width={width} height={height} alt="Logo" />
}
