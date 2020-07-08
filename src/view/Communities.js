import React, { useState, useEffect } from "react";
import { getAllCommunities } from "../api/community/Community";

import { Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom"

import "../assets/scss/pages/communities.scss"

export default function Communities() {
    let [communities, setCommunities] = useState([]);
    let [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const loadCommunities = async () => {
            let data = await getAllCommunities();

            if (data.status !== 200) {
                setLoaded(true)
            } else {
                setCommunities(data.data)
                setLoaded(true)
            }
        };

        loadCommunities();
    }, []);

    return (
        <div className="communities-container">
            <div className="communities-header">
                <h1>Communities</h1>
                <p>These are the currently available communities.</p>
            </div>

            {!loaded && (
                <Spin style={{marginTop: "4rem"}} indicator={<LoadingOutlined />} />
            )}

            {communities.length === 0 && loaded && (<Empty/>)}

            {communities.length !== 0 && loaded && (
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
