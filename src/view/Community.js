import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../assets/scss/pages/viewer.scss";
import Feed from "../components/feed/Feed";
import { Empty, Spin, Typography } from "antd";
import { getCommunityByName } from "../api/community/Community";
import {LoadingOutlined} from "@ant-design/icons"

const { Text } = Typography

/**
 * A community viewer.
 * @param {*} props 
 */
export default function Community() {
    const {
        params: { community },
    } = useRouteMatch();

    let [com, setCom] = useState({
        id: -1,
        name: community,
    });

    useEffect(() => {
        const loadData = async () => {
            let data = await getCommunityByName(community);

            if (data != null && data.community !== undefined) {
                setCom((prevState) => {
                    return {
                        ...prevState,
                        id: data.community.id,
                        name: data.community.name,
                        createdAt: data.community.createdAt,
                        desc: data.community.description,
                        selfRole: data.selfRole,
                        postRole: data.community.postRole
                    };
                });
            } else {
                setCom((prevState) => {
                    return {
                        ...prevState,
                        id: -2,
                    };
                });
            }
        };

        loadData();
    }, [community]);

    return (
        <div className="viewer-container">
            {com.id !== -1 && com.id !== -2 && (
                <>
                    <h1 className="viewer-header">{com.name}</h1>

                    <br />

                    <div className="viewer-feed">
                        <Feed
                            id={`cf_${com.id}`}
                            postBox={com.selfRole >= com.postRole}
                        />

                        <div className="viewer-about">
                            <div className="viewer-about-section">
                                <h3>{com.name}</h3>

                                <Text>{com.desc}</Text>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {com.id === -1 && (
                <div className="empty-container spin-container">
                    <Spin indicator={<LoadingOutlined />}></Spin>
                </div>
            )}

            {com.id === -2 && (
                <div className="empty-container">
                    <Empty />
                </div>
            )}
        </div>
    );
}
