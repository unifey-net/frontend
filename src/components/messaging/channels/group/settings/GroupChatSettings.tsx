import { Alert, Button, Input } from "antd"
import Modal from "antd/lib/modal/Modal"
import React, { useState } from "react"
import { MdSettings } from "react-icons/md"
import { useSelector } from "react-redux"
import { useMessageSocket } from "../../../MessagesSocket"
import GroupMessageChannel from "../../../objects/GroupMessageChannel"
import GroupChatMember from "./GroupChatMember"
import toast from "react-hot-toast"
import {
    groupChangeDescription,
    groupChangeName,
} from "../../../redux/messages"
import { useAppDispatch } from "../../../../../util/Redux"

const GroupChatSettings: React.FC<{ channel: GroupMessageChannel }> = ({
    channel,
}) => {
    const dispatch = useAppDispatch()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const {
        groupChats: { changeName, changeDescription },
    } = useMessageSocket()

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    const [alert, setAlert] = useState(undefined as JSX.Element | undefined)

    const members = useSelector(
        (state: any) => state.messages[channel.id].members
    )

    const save = async () => {
        setLoading(true)

        if (description !== channel.description || name !== channel.name) {
            if (description !== channel.description) {
                changeDescription(channel.id, description)
                dispatch(groupChangeDescription({ channel, description }))
            }

            if (name !== channel.name) {
                changeName(channel.id, name)
                dispatch(groupChangeName({ channel, name: name }))
            }

            setLoading(false)
            setVisible(false)

            toast.success("Successfully updated group chat!")
        } else {
            setAlert(<Alert message="Nothing changed!" type="error" />)
        }

        setLoading(false)
    }

    return (
        <>
            <button onClick={() => setVisible(true)}>
                <MdSettings />
            </button>

            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={() => save()}
                okText={"Save changes"}
                confirmLoading={loading}
                title={`Edit ${channel.name}`}
            >
                {alert && <>{alert}</>}

                <h2>Name</h2>
                <Input
                    value={name}
                    onChange={val => setName(val.target.value)}
                    defaultValue={channel.name}
                />

                <h2>Description</h2>
                <Input
                    value={description}
                    onChange={val => setDescription(val.target.value)}
                    defaultValue={channel.description}
                />

                <h2>Members</h2>
                <ul>
                    {members.map((user: number) => (
                        <GroupChatMember channel={channel} user={user} />
                    ))}
                </ul>
            </Modal>
        </>
    )
}

export default GroupChatSettings
