import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Menu, Tooltip, Dropdown, Button, Avatar } from "antd";
import { Link } from "react-router-dom"
import { themeLight, themeDark, themeAuto } from "../../redux/actions/theme.actions";
import { BulbFilled, BulbOutlined, UserOutlined } from "@ant-design/icons";
import { isAutoDark } from "../../api/Util";
import SubMenu from "antd/lib/menu/SubMenu";
import { getImageUrl } from "../../api/user/User";

export default () => {
    let dispatch = useDispatch();

    let theme = useSelector((store: any) => store.theme);
    let self = useSelector((store: any) => store.auth);

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
                    <span
                        className={theme.theme === "light" ? "g-active" : ""}
                        onClick={() => dispatch(themeLight(true))}
                    >
                        Light Mode <BulbFilled />
                    </span>
                </Menu.Item>
                <Menu.Item key="1">
                    <span
                        className={theme.theme === "dark" ? "g-active" : ""}
                        onClick={() => dispatch(themeDark(true))}
                    >
                        Dark Mode <BulbOutlined />
                    </span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">
                    <span
                        className={theme.theme === "auto" ? "g-active" : ""}
                        onClick={() => dispatch(themeAuto(true))}
                    >
                        <Tooltip title="Automatically change the theme to dark or light depending on your time.">
                            <>
                                Auto
                                {isAutoDark() && <BulbOutlined />}
                                {!isAutoDark() && <BulbFilled />}
                            </>
                        </Tooltip>
                    </span>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="4">
                <Link to={`/settings`}>Settings</Link>
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
                        <Avatar size={32} src={getImageUrl(name)} />
                    </Button>
                </Dropdown>
            )}

            {!self.isLoggedIn && (
                <Link to={`/login`} className="mt-2">
                    <Avatar size={32} icon={<UserOutlined />} />
                </Link>
            )}
        </div>
    );
}
