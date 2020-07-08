import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../assets/scss/pages/viewer.scss";

import { getUserByName, signedIn, getImageUrl } from "../api/user/User";
import Feed from "../components/feed/Feed";

import { Empty, Spin, Typography, Divider } from "antd";
import Avatar from "antd/es/avatar";

import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Text } = Typography;

export default function User() {
    const {
        params: { name },
    } = useRouteMatch();

    let self = useSelector((state) => state.auth);

    let [user, setUser] = useState({
        id: -1,
    });

    let [loaded, setLoaded] = useState({
        error: false,
        loaded: false,
    });

    useEffect(() => {
        const loadUser = async () => {
            let response = await getUserByName(name);

            if (response == null || response.status !== 200) {
                setLoaded({
                    error: true,
                    loaded: true,
                });
            } else {
                setUser((prevState) => {
                    return {
                        ...prevState,
                        id: response.data.id,
                        name: response.data.username,
                        createdAt: response.data.createdAt,
                        role: response.data.role,
                        verified: response.data.verified,
                        profile: {
                            location: response.data.profile.location,
                            discord: response.data.profile.discord,
                            description: response.data.profile.description,
                        },
                    };
                });

                setLoaded({
                    error: false,
                    loaded: true
                })
            }
        };

        loadUser();
    }, [name]);

    return (
        <div className="viewer-container">
            {loaded.loaded && !loaded.error && (
                <>
                    <h1 className="viewer-header">
                        {user.name}{" "}
                        <Avatar size={64} src={getImageUrl(user.name)} />
                    </h1>

                    <br />

                    <div className="viewer-feed">
                        <Feed id={`uf_${user.id}`} postBox={signedIn()} />

                        <div className="viewer-about">
                            <div className="viewer-about-section">
                                <h3>
                                    {user.name}{" "}
                                    {user.verified && <CheckCircleOutlined />}
                                </h3>

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

            {!loaded.loaded && (
                <div className="empty-container">
                    <Spin indicator={<LoadingOutlined />}></Spin>
                </div>
            )}

            {loaded.error && loaded.loaded && (
                <div className="empty-container">
                    <Empty />
                </div>
            )}
        </div>
    );
}
