import React, { useState, useEffect } from "react";
import { getAllCommunities } from "../../api/community/Community";

import { Spin, Empty, Divider, Button, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { getSelf } from "../../api/user/User";
import { leaveCommunity, joinCommunity } from "../../api/user/User";
import CommunityManage from "../../components/feed/CommunityManage";

export default function Communities() {
    let [communities, setCommunities] = useState([]);
    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadCommunities = async () => {
            let data = await getAllCommunities();

            if (data.status !== 200) {
                setLoaded(true);
            } else {
                let comms = data.data

                comms.sort((a, b) => {
                    return b.size - a.size;
                })

                setCommunities(comms);
                setLoaded(true);
            }
        };

        loadCommunities();
    }, []);

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

                                        <CommunityManage community={community.id} />
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
                                            {community.size} Members
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
