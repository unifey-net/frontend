import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import { Empty, Spin, Typography, Divider } from "antd";
import { getCommunityByName } from "../../api/community/Community";
import { LoadingOutlined, EditOutlined } from "@ant-design/icons";
import CommunityManage from "../../components/feed/CommunityManage";

const { Text } = Typography;

/**
 * A community viewer.
 * @param {*} props
 */
export default function Community() {
    const {
        params: { community, post },
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
                    loaded: true,
                });
            }
        };

        loadData();
    }, [community]);

    return (
        <div className="flex flex-col items-center justify-center">
            {loaded.loaded && !loaded.error && (
                <>
                    <div className="flex flex-col lg:block">
                        <h1 className="text-3xl lg:text-4xl">
                            {data.community.name}
                        </h1>
                        <div className="block mb-6 lg:hidden">
                            <CommunityManage
                                className="mb-4"
                                community={data.community.id}
                            />
                            <br />
                            <Text>{data.community.description}</Text>
                            <br />
                            <br />
                            Created On —{" "}
                            <Text>
                                {new Date(
                                    data.community.createdAt
                                ).toLocaleString()}
                            </Text>
                            <br />
                            Member Count —{" "}
                            <Text>{data.community.size} members.</Text>
                        </div>
                    </div>

                    <br />

                    <div className="block lg:flex lg:flex-row lg:justify-between lg:gap-16">
                        <Feed
                            id={`cf_${data.community.id}`}
                            postBox={data.selfRole >= data.community.postRole}
                            community={data.community}
                            focus={post}
                        />

                        <div
                            className="accent p-4 rounded mt-16 invisible lg:visible"
                            style={{
                                maxWidth: "200px",
                                height: "min-content",
                            }}
                        >
                            <div className="flex flex-row justify-between">
                                <h3 className="text-lg">
                                    {data.community.name}
                                </h3>

                                <CommunityManage
                                    community={data.community.id}
                                />
                            </div>

                            <Text>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: data.community.description,
                                    }}
                                />
                            </Text>

                            <Divider />

                            <h3 className="text-lg">Member Count</h3>
                            <Text>{data.community.size} members.</Text>

                            <Divider />

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