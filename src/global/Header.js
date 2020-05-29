import React from "react";
import { Link } from "react-router-dom"
import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';
import UserView from "../posts/UserView"

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
            <span className="title"><Link to="/" className="unifey">Unifey</Link></span>
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
            </div>{/* TODO */}
            <UserView/>
        </div>
    );
}
