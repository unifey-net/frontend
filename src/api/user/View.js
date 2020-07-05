import React from "react";
import { Avatar, Menu, Dropdown, Button } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { getImageUrl } from "./User"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { CheckOutlined } from "@ant-design/icons"

/**
 * The top right avatar in a post.
 * @param {*} props 
 */
export function UserView(props) {
    return (
        <div className="user-view-container">
            <a href={`/u/${props.username}`}>
                {props.username}
                {props.verified && <CheckOutlined />}
                <Avatar size={38} src={getImageUrl(props.username)} />
            </a>
        </div>
    );
}

/**
 * The signed in user's image. If not signed in, redirect to login.
 */
export function SelfView() {
    let self = useSelector(store => store.auth)
    let name = self.user.username

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to={`/u/${name}`}>View my Profile</Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link to={`/logout`}>Sign Out</Link>
            </Menu.Item>
            <Menu.Item key="3" disabled>
                Settings
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="user-view-container">
            {self.isLoggedIn && (
                <Dropdown overlay={menu}>
                    <Button
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                        type="link"
                    >
                        {name}
                        {self.user.verified && <CheckOutlined />}
                        <Avatar
                            size={38}
                            className="avatar"
                            src={getImageUrl(name)}
                        />
                    </Button>
                </Dropdown>
            )}

            {!self.isLoggedIn && (
                <Link to={`/login`}>
                    Login
                    <Avatar
                        size={38}
                        className="avatar"
                        icon={<UserOutlined />}
                    />
                </Link>
            )}
        </div>
    );
}
