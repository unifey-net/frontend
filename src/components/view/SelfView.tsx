import React from "react"
import { useSelector } from "react-redux"
import { Menu, Dropdown, Button, Avatar, Badge, Spin } from "antd"
import { Link } from "react-router-dom"
import { getImageUrl } from "../../api/user/User"
import styled from "styled-components"
import UnreadNotificationCount from "../notifications/UnreadNotificationCount"
import History from "../../api/History"
import { MdAccountCircle } from "react-icons/md"

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

const SelfViewLink = styled.div`
    a {
        color: white;
    }

    span:hover {
        color: #969696;
    }
`

const SelfView: React.FC = () => {
    let self = useSelector((store: any) => store.auth)
    
    const onlineCount = useSelector((store: any) => store.friends.online).length
    const unreadCount = useSelector((store: any) => store.notifications.unread)

    let name = self.user.username

    const menu = (
        <Menu>
            <SelfViewLink>
                <Menu.Item key="0">
                    <Link to={`/u/${name}`}>Profile</Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to={`/settings`}>Settings</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <NotificationShelf
                        onClick={() => History.push("/notifications")}
                    >
                        <span>Notifications</span>
                        <UnreadNotificationCount
                            count={unreadCount}
                            overflow={100}
                        />
                    </NotificationShelf>
                </Menu.Item>
                <Menu.Item key="3">
                    <NotificationShelf onClick={() => History.push("/friends")}>
                        <span>Friends</span>
                        <UnreadNotificationCount
                            count={onlineCount}
                            overflow={100}
                        />
                    </NotificationShelf>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={`/messages`}>Messages</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="5">
                    <Link to={`/logout`}>Sign Out</Link>
                </Menu.Item>
            </SelfViewLink>
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
                        <Badge count={unreadCount === -1 ? undefined : unreadCount} overflowCount={9}>
                            {name === "" ? (
                                <Spin />
                            ) : (
                                <Avatar size={32} src={getImageUrl(name)} />
                            )}
                        </Badge>
                    </Button>
                </Dropdown>
            )}

            {!self.isLoggedIn && (
                <Link to={`/login`} style={{ marginTop: "8px" }}>
                    <MdAccountCircle size={32} />
                </Link>
            )}
        </>
    )
}

export default SelfView