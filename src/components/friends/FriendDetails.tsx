import React from "react"
import toast from "react-hot-toast";
import { MdAdd, MdMessage, MdRemove } from "react-icons/md";
import styled from "styled-components";
import { API } from "../../api/ApiHandler";
import { Friend } from "../../api/user/Friends";
import friends from "../../redux/reducers/friends.reducer";

const FriendStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    min-width: 300px;

    background-color: ${({ theme }) => theme.primary};

    padding: 8px;
    margin-bottom: 8px;

    button { 
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .controls {
        display: flex;
        flex-direction: column;

        svg {
            width: 32px;
            height: 32px;
        }
    }

    p {
    }
`

const FriendDetails: React.FC<{ friend: Friend, refetch: () => void }> = ({ friend, refetch }) => {
    const removeFriend = async () => {
        let response = await API.delete(`/user/friends/${friend.friend}`)

        if (response.status === 200) {
            toast.success("Succesfully removed friend.")
            refetch()
        } else {
            toast.error(response.data.payload)
        }
    }

    return (
        <FriendStyle>
            <p>{friend.friendDetails.username}</p>

            <div className="controls">
                <button onClick={() => removeFriend()}>
                    <MdRemove  />
                </button>
            </div>
        </FriendStyle>
    )
}

export default FriendDetails