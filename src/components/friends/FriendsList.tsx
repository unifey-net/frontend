import { Empty, Spin } from "antd"
import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { useApi } from "../../api/ApiHandler"
import { Friend } from "../../api/user/Friends"
import FriendDetails from "./FriendDetails"

const ListStyle = styled.div``

/**
 * The friends list
 */
const FriendsList: React.FC = () => {
    const [{ data, loading, error }, refetch] = useApi("/user/friends")

    if (loading) return <Spin />
    if (error) return <Empty />

    return (
        <ListStyle>
            {data.map((data: Friend, index: number) => (
                <div key={index}>
                    <FriendDetails friend={data} refetch={refetch} />
                </div>
            ))}

            {data.length === 0 && <Empty description="You have no friends." />}
        </ListStyle>
    )
}

export default FriendsList
