import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Feed from "../components/feed/Feed";
import { Empty, Spin, Typography, Divider } from "antd";
import { getCommunityByName } from "../api/community/Community";
import { LoadingOutlined, EditOutlined } from "@ant-design/icons";

const { Text } = Typography;

/**
 * A community viewer.
 * @param {*} props
 */
export default function Community() {
    const {
        params: { community },
    } = useRouteMatch();

    let [loaded, setLoaded] = useState({
        error: false,
        loaded: false,
    });

    let [data, setData] = useState({
        id: -1,
        name: community,
    });

    useEffect(() => {
        const loadData = async () => {
            let data = await getCommunityByName(community);

            if (data.status !== 200) {
                setLoaded({
                    error: true,
                    loaded: true,
                });
            } else {
                setData(data.data);

                setLoaded({
                    error: false,
                    loaded: true
                })
            }
        };

        loadData();
    }, [community]);

    return (
        <div className="flex flex-col items-center justify-center">
            {loaded.loaded && !loaded.error && (
                <>
                    <h1 className="text-4xl">{data.community.name}</h1>

                    <br />

                    <div className="flex flex-row justify-between gap-16">
                        <Feed
                            id={`cf_${data.community.id}`}
                            postBox={data.selfRole >= data.community.postRole}
                            community={data.community}
                        />

                        <div
                            className="p-4 rounded mt-16"
                            style={{
                                backgroundColor: "#171616",
                                height: "min-content",
                                maxWidth: "200px"
                            }}
                        >
                            <div className="flex flex-row justify-between">
                                <h3 className="text-lg">{data.community.name}</h3>
                            </div>

                            <Text>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: data.community.description,
                                    }}
                                />
                            </Text>

                            <Divider/>

                            <h3 className="text-lg">Created On</h3>
                            <Text>
                                {new Date(
                                    data.community.createdAt
                                ).toLocaleString()}
                            </Text>
                        </div>
                    </div>
                </>
            )}

            {!loaded.loaded && !loaded.error && (
                <div className="flex align-center justify-center">
                    <Spin indicator={<LoadingOutlined />}></Spin>
                </div>
            )}

            {loaded.error && (
                <div className="flex align-center justify-center">
                    <Empty />
                </div>
            )}
        </div>
    );
}
