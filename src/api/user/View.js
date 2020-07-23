import React from "react";
import { Avatar, Menu, Dropdown, Button, Tooltip, Divider, Badge } from "antd";
import { UserOutlined, BulbFilled, BulbOutlined, EditOutlined, CoffeeOutlined } from "@ant-design/icons";
import { getImageUrl } from "./User";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import { themeLight, themeDark, themeAuto } from "../../redux/actions/theme.actions";
import SubMenu from "antd/lib/menu/SubMenu";
import { isAutoDark } from "../Util";

/**
 * The top right avatar in a post.
 * @param {*} props
 */
export function UserView(props) {
    return (
        <div>
            <a href={`/u/${props.username}`}>
                <Tooltip title={props.username}>
                    <Avatar size={38} src={getImageUrl(props.username)} />
                </Tooltip>
            </a>
        </div>
    );
}

/**
 * The signed in user's image. If not signed in, redirect to login.
 */
export function SelfView() {
    let dispatch = useDispatch();

    let theme = useSelector((store) => store.theme);
    let self = useSelector((store) => store.auth);

    let name = self.user.username;

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to={`/u/${name}`}>View my Profile</Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link to={`/logout`}>Sign Out</Link>
            </Menu.Item>
            <SubMenu title="Themes" key="2">
                <Menu.Item key="0">
                    <Link
                        className={theme.theme === "light" ? "g-active" : ""}
                        onClick={() => dispatch(themeLight(true))}
                    >
                        Light Mode <BulbFilled />
                    </Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link
                        className={theme.theme === "dark" ? "g-active" : ""}
                        onClick={() => dispatch(themeDark(true))}
                    >
                        Dark Mode <BulbOutlined />
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">
                    <Link
                        className={theme.theme === "auto" ? "g-active" : ""}
                        onClick={() => dispatch(themeAuto(true))}
                    >
                        <Tooltip message="Automatically change the theme to dark or light depending on your time.">
                            Auto
                            {isAutoDark() && <BulbOutlined />}
                            {!isAutoDark() && <BulbFilled />}
                        </Tooltip>
                    </Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="4">
                <Link to={`/settings`}>Settings <CoffeeOutlined/></Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="flex flex-row">
            {self.isLoggedIn && (
                <Dropdown overlay={menu}>
                    <Button
                        className="ant-dropdown-link mt-1"
                        onClick={(e) => e.preventDefault()}
                        type="link"
                    >
                        <Avatar
                            size={32}
                            src={getImageUrl(name)}
                        />
                    </Button>
                </Dropdown>
            )}

            {!self.isLoggedIn && (
                <Link to={`/login`} className="mt-2">
                    <Avatar
                        size={32}
                        icon={<UserOutlined />}
                    />
                </Link>
            )}
        </div>
    );
}
