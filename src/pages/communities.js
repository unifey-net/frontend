import React, { useState, useEffect } from "react";
import { getAllCommunities } from "../api/CommunityHandler";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom"

import "../assets/scss/pages/communities.scss"

export default function Communities() {
    let [communities, setCommunities] = useState([]);

    useEffect(() => {
        const loadCommunities = async () => {
            let data = await getAllCommunities();

            setCommunities(data);
        };

        loadCommunities();
    }, []);

    return (
        <div className="communities-container">
            <div className="communities-header">
                <h1>Communities</h1>
                <p>These are the currently available communities.</p>
            </div>

            {communities.length === 0 && (
                <Spin style={{marginTop: "4rem"}} indicator={<LoadingOutlined />} />
            )}

            {communities.length !== 0 && (
                <ul className="communities-list">
                    {communities.map((community, index) => (
                        <li key={index}>
                            <Link to={`/c/${community.name}`}>
                                {community.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
