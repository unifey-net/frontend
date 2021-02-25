import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React from "react"

type Props = {
    children: React.ReactNode
    className?: string
    onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    loading?: boolean
}

export default ({ children, onClick, className, loading }: Props) => {
    return (
        <span
            className={`${className} cursor-pointer hover:text-gray-300`}
            onClick={onClick}
        >
            {children} {loading && <Spin indicator={<LoadingOutlined />} />}
        </span>
    )
}
