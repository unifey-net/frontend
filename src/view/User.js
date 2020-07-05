import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../assets/scss/pages/viewer.scss";

import { getUserByName, signedIn, getSelf } from "../api/user/User"
import Feed from "../components/feed/Feed"

import { Empty, Spin, Typography, Divider } from "antd";
import Avatar from "antd/es/avatar";
import { BASE_URL } from "../api/ApiHandler";

import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Text } = Typography

export default function User() {
    const {
        params: { name },
    } = useRouteMatch();

    let self = useSelector((state) => state.auth);

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
        <div className="viewer-container">
            {user.id !== -1 && user.id !== -2 && (
                <>
                    <h1 className="viewer-header">
                        {user.name}{" "}
                        <Avatar
                            size={64}
                            src={`${BASE_URL}/user/name/${user.name}/picture`}
                        />
                    </h1>

                    <br />

                    <div className="viewer-feed">
                        <Feed id={`uf_${user.id}`} postBox={signedIn()} />

                        <div className="viewer-about">
                            <div className="viewer-about-section">
                                <h3>{user.name}</h3>

                                {self.isLoggedIn &&
                                    user.name === self.user.username && (
                                        <Text editable>
                                            {user.profile.description}
                                        </Text>
                                    )}

                                {(!self.isLoggedIn ||
                                    user.name !== self.user.username) && (
                                    <Text>{user.profile.description}</Text>
                                )}
                            </div>

                            <Divider />

                            <div className="viewer-about-section">
                                <h3>Joined On</h3>
                                <Text>
                                    {new Date(user.createdAt).toLocaleString()}
                                </Text>
                            </div>

                            {user.profile.location !== "" && (
                                <>
                                    <Divider />
                                    <div className="viewer-about-section">
                                        <h3>Location</h3>

                                        {self.isLoggedIn &&
                                            user.name ===
                                                self.user.username && (
                                                <Text editable>
                                                    {user.profile.location}
                                                </Text>
                                            )}

                                        {(!self.isLoggedIn ||
                                            user.name !==
                                                self.user.username) && (
                                            <Text>{user.profile.location}</Text>
                                        )}
                                    </div>
                                    {user.profile.discord !== "" && <Divider />}
                                </>
                            )}

                            {user.profile.discord !== "" && (
                                <>
                                    <div className="viewer-about-section">
                                        <h3>Discord</h3>

                                        {self.isLoggedIn &&
                                            user.name ===
                                                self.user.username && (
                                                <Text editable>
                                                    {user.profile.discord}
                                                </Text>
                                            )}

                                        {(!self.isLoggedIn ||
                                            user.name !==
                                                self.user.username) && (
                                            <Text copyable>
                                                {user.profile.discord}
                                            </Text>
                                        )}
                                    </div>
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
