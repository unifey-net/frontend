import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../assets/scss/pages/viewer.scss";
import Feed from "../components/feed/Feed";
import { Empty, Spin, Typography } from "antd";
import { getCommunityByName } from "../api/community/Community";
import { LoadingOutlined } from "@ant-design/icons";

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
                console.log(data.data)
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
        <div className="viewer-container">
            {loaded.loaded && !loaded.error && (
                <>
                    <h1 className="viewer-header">{data.community.name}</h1>

                    <br />

                    <div className="viewer-feed">
                        <Feed
                            id={`cf_${data.community.id}`}
                            postBox={data.selfRole >= data.community.postRole}
                            community={data.community}
                        />

                        <div className="viewer-about">
                            <div className="viewer-about-section">
                                <h3>{data.community.name}</h3>

                                <Text>{data.community.description}</Text>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {!loaded.loaded && !loaded.error && (
                <div className="empty-container spin-container">
                    <Spin indicator={<LoadingOutlined />}></Spin>
                </div>
            )}

            {loaded.error && (
                <div className="empty-container">
                    <Empty />
                </div>
            )}
        </div>
    );
}
