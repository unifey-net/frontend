import React from "react"
import { useSelector } from "react-redux"
import { Menu, Dropdown, Button, Avatar, Badge } from "antd"
import { Link } from "react-router-dom"
import { UserOutlined } from "@ant-design/icons"
import { getImageUrl } from "../../api/user/User"
import styled from "styled-components"
import UnreadNotificationCount from "../notifications/UnreadNotificationCount"
import History from "../../api/History"

const NotificationShelf = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    cursor: pointer;
    gap: 4px;

    span {
        color: rgba(255, 255, 255, 0.85);
    }
`

const SelfView: React.FC = () => {
    let self = useSelector((store: any) => store.auth)
    const unreadCount = useSelector((store: any) => store.notifications.unread)

    let name = self.user.username

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to={`/u/${name}`}>View my Profile</Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link to={`/settings`}>Settings</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <NotificationShelf
                    onClick={() => History.push("/notifications")}
                >
                    <span>Notifications</span>
                    <UnreadNotificationCount count={unreadCount} overflow={100} />
                </NotificationShelf>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
                <Link to={`/logout`}>Sign Out</Link>
            </Menu.Item>
        </Menu>
    )

    return (
        <>
            {self.isLoggedIn && (
                <Dropdown overlay={menu}>
                    <Button
                        className="ant-dropdown-link mt-1"
                        onClick={e => e.preventDefault()}
                        type="link"
                    >
                        <Badge count={unreadCount} overflowCount={9}>
                            <Avatar size={32} src={getImageUrl(name)} />
                        </Badge>
                    </Button>
                </Dropdown>
            )}

            {!self.isLoggedIn && (
                <Link to={`/login`} className="mt-2">
                    <Avatar size={32} icon={<UserOutlined />} />
                </Link>
            )}
        </>
    )
}

export default SelfView