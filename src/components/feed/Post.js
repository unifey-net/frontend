import React, { useState, useEffect } from "react";
import { UserView } from "../../api/user/View";
import {
    UpOutlined,
    DownOutlined,
    FlagOutlined,
    CaretDownFilled,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import Popconfirm from "antd/es/popconfirm";
import { message, Menu, Button, Dropdown, Tooltip } from "antd";
import { BASE_URL } from "../../api/ApiHandler";
import { signedIn, getToken, getSelf } from "../../api/user/User";
import { useSelector } from "react-redux";

/**
 * A post
 * @param {*} props
 */
export default function Post(props) {
    let [vote, setVote] = useState(props.vote);
    let [hasDownVoted, setDownVoted] = useState(false);
    let [hasUpVoted, setUpVoted] = useState(false);

    let self = useSelector((store) => store.auth.user);

    useEffect(() => {
        if (props.userVote != null) {
            if (props.userVote.vote === 1) setUpVoted(true);
            else if (props.userVote.vote === 0) {
                setDownVoted(true);
            }
        }
    }, [props.userVote]);

    /**
     * Update the vote on the backend.
     * @param {int} type
     */
    const sendVote = async (type) => {
        if (!signedIn()) {
            return;
        }

        let form = new FormData();

        form.append("vote", type);
        form.append("post", props.id);

        let response = await fetch(`${BASE_URL}/feeds/${props.feed}/vote`, {
            method: "POST",
            body: form,
            headers: {
                Authorization: "bearer " + getToken(),
            },
        });
    };

    const upVote = () => {
        if (!signedIn()) {
            return;
        }

        sendVote(1);

        if (hasUpVoted) {
            setVote((prevVote) => prevVote - 1);
            setUpVoted(false);
        } else if (hasDownVoted) {
            setVote((prevVote) => prevVote + 2);
            setUpVoted(true);
            setDownVoted(false);
        } else {
            setVote((prevVote) => prevVote + 1);
            setUpVoted(true);
        }
    };

    const downVote = () => {
        if (!signedIn()) {
            return;
        }

        sendVote(0);

        if (hasUpVoted) {
            setVote((prevVote) => prevVote - 2);
            setDownVoted(true);
            setUpVoted(false);
        } else if (hasDownVoted) {
            setVote((prevVote) => prevVote + 1);
            setDownVoted(false);
        } else {
            setVote((prevVote) => prevVote - 1);
            setDownVoted(true);
        }
    };

    const reportPost = async () => {
        let key = "reporting-" + props.id;

        message.loading({ content: "Loading...", key });

        setTimeout(() => {
            message.success({
                content: "Successfully reported!",
                key,
                duration: 2,
            });
        }, 1000);
    };

    const elevatedMenu = (
        <Menu>
            <Menu.Item>
                <Button type="link">
                    Edit <EditOutlined />{" "}
                </Button>
            </Menu.Item>

            <Menu.Item>
                <Button type="link">
                    Delete <DeleteOutlined />
                </Button>
            </Menu.Item>

            <Menu.Item>
                <Button type="link">
                    Report <FlagOutlined />
                </Button>
            </Menu.Item>
        </Menu>
    );

    const extendedMenu = (
        <Menu>
            <Menu.Item>
                <Button type="link">
                    Report <FlagOutlined />
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="post-container">
            <div className="post-title">
                <p className="title">{props.title}</p>
                <UserView username={props.author.username} />
            </div>
            <div className="post-content">
                <p>{props.content}</p>
            </div>
            <div className="post-management">
                <div className="vote-container">
                    <p className={hasUpVoted ? "upvoted" : ""}>
                        <Tooltip title="Upvote this post">
                            <UpOutlined onClick={upVote} />
                        </Tooltip>
                    </p>
                    <p className={hasDownVoted ? "downvoted" : ""}>
                        <Tooltip title="Downvote this post">
                            <DownOutlined onClick={downVote} />
                        </Tooltip>
                    </p>
                    <p>{vote}</p>
                </div>
                <div className="extra-info-container">
                    <span>
                        Posted on {new Date(props.created).toLocaleString()}
                    </span>
                    <Dropdown
                        overlay={
                            self.id === props.author.id
                                ? elevatedMenu
                                : extendedMenu
                        }
                    >
                        <a
                            className="ant-dropdown-link"
                            onClick={(e) => e.preventDefault()}
                        >
                            <CaretDownFilled />
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
