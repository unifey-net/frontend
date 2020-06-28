import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../assets/scss/pages/viewuser.scss";

import { getUserByName } from "../api/user/User"
import Feed from "../components/feed/Feed"

import { Empty, Spin } from "antd";
import Avatar from "antd/es/avatar";
import { BASE_URL } from "../api/ApiHandler";

import { LoadingOutlined } from "@ant-design/icons";

export default function User() {
    const {
        params: { name },
    } = useRouteMatch();

    let [user, setUser] = useState({
        id: -1,
    });

    useEffect(() => {
        const loadUser = async () => {
            let response = await getUserByName(name);
            let preData = await response.json()

            if (preData !== undefined && preData.payload !== undefined && response.ok) {
                let data = preData.payload;

                setUser((prevState) => {
                    return {
                        ...prevState,
                        id: data.id,
                        name: data.username,
                        createdAt: data.createdAt,
                        role: data.role,
                        profile: {
                            location: data.profile.location,
                            discord: data.profile.discord,
                            description: data.profile.description,
                        },
                    };
                });
            } else {
                setUser((prevState) => {
                    return {
                        ...prevState,
                        id: -2,
                    };
                });
            }
        };

        loadUser();
    }, [name]);

    return (
        <div className="user-container">
            {user.id !== -1 && user.id !== -2 && (
                <>
                    <h1 className="user-header">
                        {user.name}{" "}
                        <Avatar
                            size={32}
                            src={`${BASE_URL}/user/name/${user.name}/picture`}
                        />
                    </h1>

                    <br />

                    <div className="user-feed">
                        <Feed id={`uf_${user.id}`} />

                        <div className="user-about">
                            <h2>{user.name}</h2>
                            <p>{user.profile.description}</p>

                            <h3>Created On</h3>
                            <p>{new Date(user.createdAt).toLocaleString()}</p>

                            {user.profile.location !== "" && (
                                <>
                                    <h3>Location</h3>
                                    <p>{user.profile.location}</p>
                                </>
                            )}

                            {user.profile.discord !== "" && (
                                <>
                                    <h3>Discord</h3>
                                    <p>{user.profile.discord}</p>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}

            {user.id === -1 && (
                <div className="empty-container">
                    <Spin indicator={<LoadingOutlined />}></Spin>
                </div>
            )}

            {user.id === -2 && (
                <div className="empty-container">
                    <Empty />
                </div>
            )}
        </div>
    );
}
