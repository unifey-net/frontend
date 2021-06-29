import React, { useState } from "react"
import { EditOutlined } from "@ant-design/icons"
import { User } from "../../../api/user/User"
import { useSelector } from "react-redux"
import Text from "antd/lib/typography/Text"
import { message, Divider } from "antd"
import { API } from "../../../api/ApiHandler"
import UserProfileInput from "./UserProfileInput"
import styled from "styled-components"
import { desktopMedia } from "../../../api/util/Media"

const UserProfileStyle = styled.div<{ mobile: boolean }>`
    padding: 1rem;
    border-radius: 0.25rem;
    height: min-content:
    max-width: 200px;

    .username-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    
        .edit {
            margin-top: 0.5rem;
        }
    }

    ${({ mobile }) =>
        mobile
            ? `visibility: hidden; ${desktopMedia("visiblity: visible;")}`
            : `visibility: visible; ${desktopMedia("visiblity: hidden;")}`}
`

const UserProfile: React.FC<{ user: User, type?: "mobile" }> = ({ user, type }) => {
    let [editing, setEditing] = useState(false)
    let self = useSelector((state: any) => state.auth.user)

    let [description, setDescription] = useState(user.profile.description)
    let [location, setLocation] = useState(user.profile.location)
    let [discord, setDiscord] = useState(user.profile.discord)

    /**
     * Update the description.
     * @param {*} desc
     */
    const updateDescription = async (desc: string) => {
        if (desc === description) return

        setDescription(desc)

        let form = new FormData()

        form.append("description", desc)

        let request = await API.put("/user/profile/description", form)

        if (request.status !== 200)
            message.error("There was an issue updating your description!")
        else message.success("Successfully changed your description!")
    }

    /**
     * Update the discord.
     * @param {*} disc
     */
    const updateDiscord = async (disc: string) => {
        if (disc === discord) return

        setDiscord(disc)

        let form = new FormData()

        form.append("discord", disc)

        let request = await API.put("/user/profile/discord", form)

        if (request.status !== 200)
            message.error("There was an issue updating your Discord!")
        else message.success("Successfully changed your Discord!")
    }

    /**
     * Update the description.
     * @param {*} loc
     */
    const updateLocation = async (loc: string) => {
        if (loc === location) return

        setLocation(loc)

        let form = new FormData()

        form.append("location", loc)

        let request = await API.put("/user/profile/location", form)

        if (request.status !== 200)
            message.error("There was an issue updating your location!")
        else message.success("Successfully changed your location!")
    }

    return (
        <UserProfileStyle mobile={type === "mobile"}>
            <div className="username-container">
                <h3>{user.username}</h3>

                {self.id === user.id && (
                    <EditOutlined
                        className="edit"
                        onClick={() => setEditing(prev => !prev)}
                    />
                )}
            </div>

            <UserProfileInput
                type="Description"
                initialValue={description}
                editing={editing}
                hideTitle={true}
                update={updateDescription}
            />

            <Divider />

            <h3>Joined On</h3>
            <Text>{new Date(user.createdAt).toLocaleString()}</Text>

            <Divider />

            <UserProfileInput
                type="Location"
                initialValue={location}
                editing={editing}
                update={updateLocation}
            />

            <Divider />

            <UserProfileInput
                type="Discord"
                initialValue={discord}
                editing={editing}
                update={updateDiscord}
            />
        </UserProfileStyle>
    )
}

export default UserProfile
