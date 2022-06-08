import { LoadingOutlined } from "@ant-design/icons"
import { Divider, Spin } from "antd"
import React, { useEffect, useRef, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { Post } from "../../api/Feeds"
import { useLiveSocket } from "../../api/live/Live"
import { getSelf } from "../../api/user/User"
import DefaultContainer from "../DefaultContainer"
import MessageJsx from "./Message"
import { useMessageSocket } from "./MessagesSocket"
import DirectMessageChannel from "./objects/DirectMessageChannel"
import GroupMessageChannel from "./objects/GroupMessageChannel"
import IncomingMessageResponse from "./objects/IncomingMessageResponse"
import Message from "./objects/Message"
import SendMessage from "./SendMessage"
import UsersTyping from "./UsersTyping"

const MessagesStyles = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 300px;
    min-height: 300px;
    overflow-y: scroll;

    .message-controls {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
`

const Messages: React.FC<{ id: number }> = ({ id }) => {
    const endRef = useRef<HTMLDivElement>(null)
    const { loadMessageHistory } = useMessageSocket()

    const {
        messages,
        pageCount: maxPage,
        typing,
    } = useSelector((state: any) => state.messages)[`${id}`]
    const { username: selfUsername, id: selfId } = useSelector(
        (state: any) => state.auth.user
    )

    const [page, setPage] = useState(1)

    const loadMore = () => {
        console.log("wanting to load some more :)")
        loadMessageHistory(id, page)
        setPage(prev => prev + 1)
    }

    useEffect(() => {
        loadMore()
    }, [])

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <MessagesStyles>
            <InfiniteScroll
                dataLength={messages.length}
                next={loadMore}
                hasMore={maxPage >= page}
                loader={
                    <DefaultContainer>
                        <Spin key={0} indicator={<LoadingOutlined />} />
                    </DefaultContainer>
                }
            >
                <div className="message-controls">
                    <button
                        onClick={() =>
                            endRef.current?.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        Scroll to Bottom
                    </button>

                    {page <= maxPage && (
                        <button onClick={loadMore}>Force Load More</button>
                    )}
                </div>
                {messages.map((message: Message | IncomingMessageResponse) => {
                    // incoming message
                    if ("sentFrom" in message) {
                        const {
                            message: { message: content, time },
                            sentFrom: { second: username },
                        } = message as IncomingMessageResponse
                        return (
                            <MessageJsx
                                user={username}
                                message={content}
                                time={new Date(time)}
                            />
                        )
                    } else {
                        // outgoing
                        const { time, message: content } = message
                        return (
                            <MessageJsx
                                user={selfUsername}
                                message={content}
                                time={new Date(time)}
                            />
                        )
                    }
                })}

                <UsersTyping channel={id} />

                <div ref={endRef} />
            </InfiniteScroll>
        </MessagesStyles>
    )
}

export default Messages
