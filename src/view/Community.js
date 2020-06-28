import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../assets/scss/pages/community.scss";
import Feed from "../components/feed/Feed";
import { Empty, Spin } from "antd";
import { getCommunityByName } from "../api/community/Community";
import {LoadingOutlined} from "@ant-design/icons"

export default function Community(props) {
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
        <div className="community-container">
            {com.id !== -1 && com.id !== -2 && (
                <>
                    <h1 className="community-header">{com.name}</h1>

                    <br />

                    <div className="community-feed">
                        <Feed id={`cf_${com.id}`} postBox={com.selfRole >= com.postRole} />

                        <div className="community-about">
                            <h2>{com.name}</h2>
                            <p>{com.desc}</p>

                            <h3>Created On</h3>
                            <p>{new Date(com.createdAt).toLocaleString()}</p>
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
