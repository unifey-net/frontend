import { useRouteMatch } from "react-router-dom";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import "../assets/scss/pages/community.scss";
import Feed from "../posts/Feed";

import { CalendarOutlined } from "@ant-design/icons";

import { Descriptions, Empty, Spin } from "antd";
import Avatar from "antd/es/avatar";
import { getCommunityByName } from "../api/CommunityHandler";
import BookOutlined from "@ant-design/icons/lib/icons/BookOutlined";
import { BASE_URL } from "../api/ApiHandler";
import {LoadingOutlined} from "@ant-design/icons"

export default function ViewCommunity(props) {
    const {
        params: { community },
    } = useRouteMatch();

    let [com, setCom] = useState({
        id: -1,
        name: community,
    });

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

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="community-container">
            {com.id !== -1 && com.id !== -2 && (
                <>
                    <h1 className="community-header">{com.name}</h1>

                    <br />

                    <div className="community-feed">
                        <Feed id={`cf_${com.id}`} />

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
                <div className="empty-container">
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
