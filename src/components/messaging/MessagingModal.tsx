import { Divider } from "antd"
import Modal from "antd/lib/modal/Modal"
import React, { useState } from "react"
import Messages from "./Messages"
import SendMessage from "./SendMessage"

/**
 * A messaging modal. 
 * 
 * This is where you send and receive messages from others.
 */
const useMessagingModal = (
    channel: number,
    friendName: string
): [JSX.Element, () => void] => {
    const [isVisible, setVisible] = useState(false)

    const messageModal = (
        <Modal
            visible={isVisible}
            title={`Messaging ${friendName}`}
            onCancel={() => setVisible(false)}
        >
            <Messages id={channel} />
            <Divider />
            <SendMessage channel={channel} />
        </Modal>
    )

    return [messageModal, () => setVisible(vis => !vis)]
}

export default useMessagingModal