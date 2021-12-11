import Modal from "antd/lib/modal/Modal"
import React, { useState } from "react"
import { API } from "../../../../api/ApiHandler"
import { useMessageSocket } from "../../MessagesSocket"
import useGroupChatUserSelector from "./GroupChatUserSelector"

const CreateGroupChat: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [selector, value] = useGroupChatUserSelector()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { createGroupChat } = useMessageSocket()

    const onComplete = () => {
        setLoading(true)

        if (value.length === 0) {
            setLoading(false)
            setError("You must select at least one person!")
        }

        createGroupChat(value.map(userValue => userValue.value))

        setLoading(false)
        setVisible(false)
    }

    return (
        <>
            <Modal
                title="Create Group Chat"
                visible={visible}
                onCancel={() => setVisible(false)}
                confirmLoading={loading}
                onOk={onComplete}
            >
                {selector}
            </Modal>

            <button onClick={() => setVisible(true)}>Create Group Chat</button>
        </>
    )
}

export default CreateGroupChat
