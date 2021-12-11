import { Button, Input, Tooltip } from "antd"
import React, { useState } from "react"
import { MdError } from "react-icons/md"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { useLiveSocket } from "../../api/live/Live"
import { messagesOutgoing } from "./redux/messages.actions"

const SendBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.primary};
    border: 1px solid white;
    border-radius: 4px;

    input {
        border: none;
    }

    button {
        border: none !important;
    }
`

const SendMessage: React.FC<{ channel: number }> = ({ channel }) => {
    const ref = React.createRef<Input>()

    const [send] = useLiveSocket()
    const [loading, setLoading] = useState(false)
    const [prefix, setPrefix] = useState(<></>)

    const dispatch = useDispatch()

    const sendMessage = () => {
        setPrefix(<></>)
        setLoading(true)

        const msg = ref.current?.input.value
        
        if (!msg || msg.length === 0 || msg.length > 240) {
            setLoading(false)
            setPrefix(
                <Tooltip overlay={<p>Invalid message!</p>}>
                    <MdError />
                </Tooltip>
            )
            return
        }

        send({
            action: "SEND_MESSAGE",
            channel,
            message: msg
        })

        dispatch(messagesOutgoing(msg, channel, Date.now()))

        ref.current?.setValue("")
        
        setLoading(false)
    }

    return <SendBox>
        <Input id="msgbox" prefix={prefix} ref={ref} onPressEnter={() => sendMessage()} />

        <Button loading={loading} onClick={sendMessage}>Send</Button>
    </SendBox>
}

export default SendMessage