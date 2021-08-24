import React, { useState } from "react"
import { MdArrowDownward, MdArrowForward } from "react-icons/md"
import styled from "styled-components"
import ReceivedFriendRequests from "./ReceivedFriendRequests"
import SentFriendRequests from "./SentFriendRequests"

export const FriendRequestsStyle = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 300px;

    ul {
        padding-inline-start: 0;
    }

    h2 {
        button {
            margin: 0;
            padding: 0;
        }

        .visibility {
            margin-left: 8px;
            margin-right: 4px;
        }
    }

    .request {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        background-color: ${({ theme }) => theme.primary};

        padding: 8px;
    }
`

const FriendRequests: React.FC = () => {
    return (
        <div>
            <ReceivedFriendRequests />
            <SentFriendRequests />
        </div>
    )
}

export default FriendRequests
