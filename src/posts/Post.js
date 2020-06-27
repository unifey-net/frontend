import React, { useState } from "react";
import UserView from "../api/user/UserView";
import { UpOutlined, DownOutlined, FlagOutlined } from "@ant-design/icons";
import Popconfirm from "antd/es/popconfirm";
import { message } from "antd";

/**
 * A post
 * @param {*} props 
 */
export default function Post(props) {
    let [vote, setVote] = useState(0);
    let [hasDownVoted, setDownVoted] = useState(false);
    let [hasUpVoted, setUpVoted] = useState(false);

    const upVote = () => {
        if (hasUpVoted) {
            setVote((prevVote) => prevVote - 1)
            setUpVoted(false)
        } else if (hasDownVoted) {
            setVote((prevVote) => prevVote + 2)
            setUpVoted(true)
            setDownVoted(false)
        } else {
            setVote((prevVote) => prevVote + 1)
            setUpVoted(true)
        }
    }

    const downVote = () => {
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
    }

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
    }

    return (
        <div className="post-container">
            <div className="post-title">
                <p className="title">{props.title}</p>
                <UserView username={props.author} />
            </div>
            <div className="post-content">
                <p>{props.content}</p>
            </div>
            <div className="post-management">
                <div className="vote-container">
                    <p className={hasUpVoted ? "upvoted" : ""}>
                        <UpOutlined onClick={upVote} />
                    </p>
                    <p className={hasDownVoted ? "downvoted" : ""}>
                        <DownOutlined onClick={downVote} />
                    </p>
                    <p>{vote}</p>
                </div>
                <Popconfirm
                    title="Are you sure you want to report this?"
                    onConfirm={reportPost}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                >
                    <FlagOutlined />
                </Popconfirm>
            </div>
        </div>
    );
}
