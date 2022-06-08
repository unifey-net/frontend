import { Spin } from "antd"
import React from "react"

type ButtonProps = {
    onClick?: () => void
    loading?: boolean
    children?: React.ReactNode
}

const LinkButton: React.FC<ButtonProps> = ({ children, onClick, loading }) => {
    return (
        <button
            onClick={onClick === undefined ? () => {} : onClick}
            className="cursor-pointer hover:text-gray-300 text-white background-transparent px-3 py-1 outline-none focus:outline-none mr-1 mb-1"
        >
            {children}
            {loading && <Spin />}
        </button>
    )
}

export default LinkButton
