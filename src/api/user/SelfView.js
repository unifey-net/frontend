import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getSelf } from "../AuthenticationManager";
import { BASE_URL } from "../ApiHandler";

export default function SelfView() {
    let [username, setUsername] = useState("");
    let [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            let self = await getSelf();

            if (self != null && self !== undefined) {
                setSignedIn(true);
                setUsername(self.username);
            }
        };

        loadData();
    }, []);

    return (
        <div className="user-view-container">
            {signedIn && (
                <a href={`/u/${username}`}>
                    {username}
                    <Avatar
                        size={38}
                        className="avatar"
                        src={`${BASE_URL}/user/name/${username}/picture`}
                    />
                </a>
            )}

            {!signedIn && (
                <a href={`/login`}>
                    {username}
                    <Avatar
                        size={38}
                        className="avatar"
                        icon={<UserOutlined />}
                    />
                </a>
            )}
        </div>
    );
}
