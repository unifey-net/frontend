import { Button, Input, Tooltip } from "antd"
import React, { useEffect, useState } from "react"
import { MdError } from "react-icons/md"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { useMessageSocket } from "./MessagesSocket"
import { outgoingMessage } from "./redux/messages"

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

/**
 * This is a send message box.
 *
 * Typing updates are sent from here.
 */
const SendMessage: React.FC<{ channel: number }> = ({ channel }) => {
    const ref = React.createRef<Input>()

    const { typing: { startTyping, stopTyping }, messages: { sendMessage }} = useMessageSocket()

    const [content, setContent] = useState("")
    const [lastTypingUpdate, setLastTypingUpdate] = useState(0)

    useEffect(() => {
        if (content !== "") {
            if (Date.now() - lastTypingUpdate > 2000) {
                startTyping(channel)

                setLastTypingUpdate(Date.now())
            }
        } else {
            stopTyping(channel)
        }
    }, [content])

    const [loading, setLoading] = useState(false)
    const [prefix, setPrefix] = useState(<></>)

    const dispatch = useDispatch()

    const createMessage = () => {
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

        sendMessage(msg, channel)

        dispatch(outgoingMessage({ message: msg, channel, time: Date.now() }))

        ref.current?.setValue("")

        setLoading(false)
    }

    return (
        <SendBox>
            <Input
                id="msgbox"
                prefix={prefix}
                onChange={ev => setContent(ev.target.value)}
                ref={ref}
                onPressEnter={createMessage}
            />

            <Button loading={loading} onClick={createMessage}>
                Send
            </Button>
        </SendBox>
    )
}

export default SendMessage
