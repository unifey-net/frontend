import React, { useState } from "react"
import { EditOutlined } from "@ant-design/icons"
import { User } from "../../../api/user/User"
import { useSelector } from "react-redux"
import Text from "antd/lib/typography/Text"
import { message, Divider } from "antd"
import { API } from "../../../api/ApiHandler"
import UserProfileInput from "./UserProfileInput"

type Props = {
    user: User
}

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
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
        <div
            className="p-4 accent rounded invisible lg:visible"
            style={{
                maxWidth: "200px",
                height: "min-content",
            }}
        >
            <div className="flex flex-row justify-between">
                <h3 className="text-lg">{user.username}</h3>

                {self.id === user.id && (
                    <EditOutlined
                        className="mt-2"
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

            <h3 className="text-lg">Joined On</h3>
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
        </div>
    )
}

export default UserProfile
