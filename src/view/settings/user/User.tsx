import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getUserByName, signedIn, getImageUrl } from "../../../api/user/User";
import Feed from "../../../components/feed/Feed";

import { Empty, Spin, Typography, Divider, Tooltip, message } from "antd";
import Avatar from "antd/es/avatar";

import {
    LoadingOutlined,
    CheckCircleOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

import { getBadges } from "../../../api/user/Cosmetics";
import { API } from "../../../api/ApiHandler";
import UserProfile from "./UserProfile";
import UserBadges from "./UserBadges";

const { Text } = Typography;

export default function User() {
    const {
        params: { name, post },
    } = useRouteMatch();

    let self = useSelector((state: any) => state.auth.user);

    let [editing, setEditing] = useState(false);

    let [user, setUser] = useState({} as any);

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
                setUser(response.data);

                setUser((prevState: any) => {
                    return {
                        ...prevState,
                        badges: getBadges(prevState.profile.cosmetics),
                    };
                });

                setLoaded({
                    error: false,
                    loaded: true,
                });
            }
        };

        loadUser();
    }, [name]);

    return (
        <div className="flex flex-col items-center justify-center">
            {loaded.loaded && !loaded.error && (
                <>
                    <div className="flex flex-col lg:block">
                        <h1 className="text-3xl lg:text-4xl">
                            {user.username}{" "}
                            <Avatar
                                size={64}
                                src={getImageUrl(user.username)}
                            />
                            <UserBadges badges={user.badges} />
                        </h1>

                        <div className="block mb-6 lg:hidden">
                            <UserProfile user={user} />
                        </div>
                    </div>

                    <div className="block lg:flex lg:flex-row lg:justify-between lg:gap-16">
                        <Feed
                            id={`uf_${user.id}`}
                            postBox={signedIn()}
                            focus={post}
                        />

                        <UserProfile user={user} />
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
