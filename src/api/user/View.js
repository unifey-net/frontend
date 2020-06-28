import React, { useEffect, useState } from "react";
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { getImageUrl, getSelf } from "./User"

/**
 * The top right avatar in a post.
 * @param {*} props 
 */
export function UserView(props) {
    return (
        <div className="user-view-container">
            <a href={`/u/${props.username}`}>
                {props.username}
                <Avatar size={38} src={getImageUrl(props.username)}/>
            </a>
        </div>
    );
}

/**
 * The signed in user's image. If not signed in, redirect to login.
 */
export function SelfView() {
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
                    <Avatar size={38} className="avatar" src={getImageUrl(username)} />
                </a>
            )}

            {!signedIn && (
                <a href={`/login`}>
                    Login
                    <Avatar size={38} className="avatar" icon={<UserOutlined />} />
                </a>
            )}
        </div>
    );
}
