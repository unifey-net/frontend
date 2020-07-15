import React, { useState, useEffect } from "react";
import { getAllCommunities } from "../api/community/Community";

import { Spin, Empty, Divider, Button, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { getSelf } from "../api/user/User";
import { leaveCommunity, joinCommunity } from "../api/user/User";

export default function Communities() {
    let [communities, setCommunities] = useState([]);
    let [loaded, setLoaded] = useState(false);

    let [self, setSelf] = useState({})

    useEffect(() => {
        const loadSelf = async () => {
            setSelf(await getSelf())
        }
        const loadCommunities = async () => {
            let data = await getAllCommunities();

            if (data.status !== 200) {
                setLoaded(true);
            } else {
                setCommunities(data.data);
                setLoaded(true);
            }
        };

        loadCommunities();
        loadSelf()
    }, []);

    const joinLeave = async (id) => {
        if (self.member.members.includes(id)) {
            let request = await leaveCommunity(id)

            if (request.status === 200) {
                message.success("Successfully left community!");
            } else {
                message.error("Failed to leave community!");
            }
        } else {
            let request = await joinCommunity(id)

            if (request.status === 200) {
                message.success("Successfully joined community!")
            } else {
                message.error("Failed to join community!")
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <h1 className="text-2xl md:text-3xl lg:text-6xl">Top Communities</h1>
            </div>

            {!loaded && (
                <Spin
                    style={{ marginTop: "4rem" }}
                    indicator={<LoadingOutlined />}
                />
            )}

            {communities.length === 0 && loaded && <Empty />}

            {communities.length !== 0 && loaded && (
                <ul className="flex flex-row flex-wrap gap-8">
                    {communities.map((community, index) => (
                        <li key={index}>
                            <div
                                className="max-w-sm rounded overflow-hidden shadow-lg gap-2 accent"
                            >
                                <div className="p-6 flex-col flex">
                                    <div className="flex flex-row justify-between">
                                        <h1 className="text-xl">
                                            <Link to={`/c/${community.name}`}>
                                                {community.name}
                                            </Link>
                                        </h1>

                                        <Button danger type="link" onClick={() => joinLeave(community.id)}>
                                            {self.member.members.includes(community.id) ? "Leave" : "Join"}
                                        </Button>
                                    </div>

                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: community.description,
                                        }}
                                    />

                                    <div className="flex flex-row justify-between">
                                        <span className="text-gray-600 text-sm">
                                            #{index + 1}
                                        </span>
                                        <span className="text-gray-600 text-sm">
                                            ? Members {/* TODO */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
