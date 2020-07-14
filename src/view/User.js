import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getUserByName, signedIn, getImageUrl } from "../api/user/User";
import Feed from "../components/feed/Feed";

import { Empty, Spin, Typography, Divider, Tooltip, message } from "antd";
import Avatar from "antd/es/avatar";

import {
    LoadingOutlined,
    CheckCircleOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

import { getBadges } from "../api/user/Cosmetics";
import { API } from "../api/ApiHandler";

const { Text } = Typography;

export default function User() {
    const {
        params: { name },
    } = useRouteMatch();

    let self = useSelector((state) => state.auth.user);

    let [editing, setEditing] = useState(false);

    let [user, setUser] = useState({
        id: -1,
    });

    let [loaded, setLoaded] = useState({
        error: false,
        loaded: false,
    });

    let [location, setLocation] = useState("");
    let [discord, setDiscord] = useState("");
    let [description, setDescription] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            let response = await getUserByName(name);

            if (response == null || response.status !== 200) {
                setLoaded({
                    error: true,
                    loaded: true,
                });
            } else {
                setUser(response.data);

                setUser((prevState) => {
                    return {
                        ...prevState,
                        badges: getBadges(prevState.profile.cosmetics),
                    };
                });

                setDescription(response.data.profile.description);
                setLocation(response.data.profile.location);
                setDiscord(response.data.profile.discord);

                setLoaded({
                    error: false,
                    loaded: true,
                });
            }
        };

        loadUser();
    }, [name]);

    /**
     * Update the description.
     * @param {*} desc 
     */
    const updateDescription = async (desc) => {
        if (desc === description)
            return

        setDescription(desc);

        let form = new FormData();

        form.append("description", desc);

        let request = await API.put("/user/profile/description", form);

        if (request.status !== 200)
            message.error("There was an issue updating your description!");
        else message.success("Successfully changed your description!");
    };

    /**
     * Update the discord.
     * @param {*} disc 
     */
    const updateDiscord = async (disc) => {
        if (disc === discord)
            return

        setDiscord(disc);

        let form = new FormData();

        form.append("discord", disc);

        let request = await API.put("/user/profile/discord", form);

        if (request.status !== 200)
            message.error("There was an issue updating your Discord!");
        else message.success("Successfully changed your Discord!");
    };

    /**
     * Update the description.
     * @param {*} loc 
     */
    const updateLocation = async (loc) => {
        if (loc === location)
            return

        setLocation(loc);

        let form = new FormData();

        form.append("location", loc);

        let request = await API.put("/user/profile/location", form);

        if (request.status !== 200)
            message.error("There was an issue updating your location!");
        else message.success("Successfully changed your location!");
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {loaded.loaded && !loaded.error && (
                <>
                    <h1 className="text-4xl">
                        {user.username}{" "}
                        <Avatar size={64} src={getImageUrl(user.username)} />
                    </h1>

                    <div className="flex flex-row justify-between gap-16">
                        <Feed id={`uf_${user.id}`} postBox={signedIn()} />

                        <div
                            className="p-4 rounded mt-16 flex flex-col items-center"
                            style={{
                                backgroundColor: "#171616",
                                height: "min-content",
                                maxWidth: "200px",
                                minWidth: "200px",
                            }}
                        >
                            <div className="flex flex-row justify-between">
                                <h3 className="text-lg">
                                    {user.username}
                                    {user.badges.length > 0 && (
                                        <div className="flex flex-row gap-2">
                                            <br />
                                            {user.badges.map((badge, index) => (
                                                <Tooltip
                                                    key={index}
                                                    title={badge.desc}
                                                >
                                                    <img
                                                        key={index}
                                                        alt={badge.id}
                                                        src={badge.image}
                                                        size={32}
                                                        width={32}
                                                    />
                                                </Tooltip>
                                            ))}
                                        </div>
                                    )}
                                </h3>

                                {self.id === user.id && (
                                    <EditOutlined
                                        className="mt-2"
                                        onClick={() =>
                                            setEditing((prev) => !prev)
                                        }
                                    />
                                )}
                            </div>

                            <Text
                                editable={
                                    editing
                                        ? {
                                              onChange: updateDescription,
                                          }
                                        : false
                                }
                            >
                                {description}
                            </Text>

                            <Divider />

                            <h3 className="text-lg">Joined On</h3>
                            <Text>
                                {new Date(user.createdAt).toLocaleString()}
                            </Text>

                            {user.profile.location !== "" && (
                                <>
                                    <Divider />

                                    <h3 className="text-lg">Location</h3>

                                    <Text
                                        editable={
                                            editing
                                                ? {
                                                      onChange: updateLocation
                                                  }
                                                : false
                                        }
                                    >
                                        {location}
                                    </Text>

                                    {user.profile.discord !== "" && <Divider />}
                                </>
                            )}

                            {user.profile.discord !== "" && (
                                <>
                                    <h3 className="text-lg">Discord</h3>

                                    <Text
                                        editable={
                                            editing
                                                ? {
                                                      onChange: updateDiscord
                                                  }
                                                : false
                                        }
                                    >
                                        {discord}
                                    </Text>
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
                    <Empty description={"That user could not be found."} />
                </div>
            )}
        </div>
    );
}
