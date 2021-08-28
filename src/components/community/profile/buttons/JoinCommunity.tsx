import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { MdAdd, MdError, MdRemove } from "react-icons/md"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { joinCommunity, leaveCommunity } from "../../../../api/user/User"
import { media } from "../../../../api/util/Media"

const JoinCommunityButton = styled.button`
    background-color: #bf1d48;
    border: none;
    border-radius: 4px;

    ${media(`font-size: 12px;`, `font-size: 16px;`, `font-size: 16px;`)}
`

/**
 * The join community button found on communities pages.
 */
const JoinCommunity: React.FC<{ community: number, mobile: boolean }> = ({ community, mobile }) => {
    const member = useSelector(
        (store: any) => store.auth.user.member.member
    ).includes(community)

    const [symbol, setSymbol] = useState(member ? <MdRemove /> : <MdAdd />)

    const onClick = async () => {
        if (member) {
            setSymbol(<Spin indicator={<LoadingOutlined />} />)

            const leaveObj = await leaveCommunity(community)

            if (leaveObj.status === 200) {
                toast.success("Successfully left the community.")
                setSymbol(<span>+</span>)
            } else {
                toast.error(leaveObj.data.payload)
                setSymbol(<MdError />)
            }
        } else {
            setSymbol(<Spin indicator={<LoadingOutlined />} />)

            const leaveObj = await joinCommunity(community)

            if (leaveObj.status === 200) {
                toast.success("Successfully joined the community.")
                setSymbol(<MdRemove />)
            } else {
                toast.error(leaveObj.data.payload)
                setSymbol(<MdError />)
            }
        }
    }

    const message = `${member ? "Leave" : "Join"}${!mobile ? " Community" : ""}`

    return (
        <JoinCommunityButton onClick={onClick}>
            {symbol} {message}
        </JoinCommunityButton>
    )
}

export default JoinCommunity
