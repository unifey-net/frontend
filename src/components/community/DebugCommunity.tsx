import React, { useState } from "react"
import { Modal, Table } from "antd"
import styled from "styled-components"
import { media } from "../../api/util/Media"
import { MdNotificationImportant } from "react-icons/md"
import { useCommunity } from "../../api/community/CommunityUtil"
import Status, { COMPLETE } from "../../api/util/Status"
import { useAppSelector } from "../../util/Redux"

const DebugCommunityButton = styled.button`
  background-color: mediumvioletred;
  border: none;
  border-radius: 4px;

  ${media(`font-size: 12px;`, `font-size: 16px;`, `font-size: 16px;`)}
`

/**
 * Debug a community. Brings up a modal with important information.
 */
const DebugCommunity: React.FC<{ community: string }> = ({ community }) => {
    const [req, status] = useCommunity(community)
    const self = useAppSelector((state) => state.auth)

    const [visible, setVisible] = useState(false)

    const modal = <Modal visible={visible} onCancel={() => setVisible(false)}>
        {status.status === COMPLETE && req !== null && <div>
            Name: {req.community.name} <br/>
            Permissions: {JSON.stringify(req.community.permissions)} <br/>
            Self Role: {req.selfRole} <br/>
            Logged In: {self.isLoggedIn ? "YES" : "NO"} <br/>
            Username: {self.user.username} <br/>
            Joined Communities: {JSON.stringify(self.member.member)} <br/>
            Joined Notification Communities: {JSON.stringify(self.member.notifications)} <br/>
            Community Supported Emotes: {JSON.stringify(req.emotes)} <br/>
        </div>}
    </Modal>

    return <>{modal} <DebugCommunityButton onClick={() => setVisible(prev => !prev)}><MdNotificationImportant/> Debug</DebugCommunityButton></>
}

export default DebugCommunity
