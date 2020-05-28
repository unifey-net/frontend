import React from "react";
import { Link } from "react-router-dom"
import { Avatar, Badge } from "antd"
import { UserOutlined } from '@ant-design/icons';

export default function Header() {
    let pages = [
        {
            name: "Home",
            location: "/"
        },
        {
            name: "About Us",
            location: "/about"
        }
    ];

    return (
        <div className="site-header">
            <span><Link to="/" className="unifey">Unifey</Link></span>
            <div>
                <ul className="site-header-links">
                    {
                        pages.map((obj, index) =>
                            <li key={index}>
                                <Link to={obj.location}>{obj.name}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}
