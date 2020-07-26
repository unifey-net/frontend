import React, { useState, useEffect } from "react";
import { signedIn } from "../../../api/user/User";
import { votePost, voteComment } from "../../../api/Feeds";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Tooltip, message } from "antd";
import { useSelector } from "react-redux";
import Vote from "../../../api/user/Vote"
import { Post } from "../../../api/Feeds"

type Props = {
    vote: Vote,
    post: Post,
    postType?: string
}

export default ({ vote, post, postType }: Props): JSX.Element => {
    let [number, setNumber] = useState(post.upvotes - post.downvotes);

    let [hasDownVoted, setDownVoted] = useState(false);
    let [hasUpVoted, setUpVoted] = useState(false);

    let postId = useSelector((store: any) => store.post)

    useEffect(() => {
        if (vote != undefined) {
            switch (vote.vote) {
                case 1: {
                    setUpVoted(() => true);
                    break;
                }

                case 0: {
                    setDownVoted(() => true);
                    break;
                }

                default: {
                    break;
                }
            }
        }
    }, []);

    /**
     * Update the vote on the backend.
     * @param {int} type
     */
    const sendVote = async (type: number) => {
        if (!signedIn()) {
            return;
        }

        let response;

        if (postType === "comment") {
            response = await voteComment(post.feed, postId, type, post.id);
        } else {
            response = await votePost(post.feed, post.id, type);
        }

        if (response.status !== 200) {
            message.error("There was an issue upvoting that post!");
        }
    };

    const upVote = () => {
        if (!signedIn()) {
            return;
        }

        if (hasUpVoted) {
            setNumber((prevVote) => prevVote - 1);
            setUpVoted(false);

            sendVote(-1);
        } else if (hasDownVoted) {
            setNumber((prevVote) => prevVote + 2);
            setUpVoted(true);
            setDownVoted(false);

            sendVote(1);
        } else {
            setNumber((prevVote) => prevVote + 1);
            setUpVoted(true);

            sendVote(1);
        }
    };

    const downVote = () => {
        if (!signedIn()) {
            return;
        }

        if (hasUpVoted) {
            setNumber((prevVote) => prevVote - 2);

            setDownVoted(true);
            setUpVoted(false);

            sendVote(0);
        } else if (hasDownVoted) {
            setNumber((prevVote) => prevVote + 1);

            setDownVoted(false);

            sendVote(-1);
        } else {
            setNumber((prevVote) => prevVote - 1);

            setDownVoted(true);

            sendVote(0);
        }
    };

    return (
        <div className="flex flex-row justify-between gap-2">
            <p className={hasUpVoted ? "text-green-600" : ""}>
                <Tooltip title="Upvote this post">
                    <UpOutlined onClick={upVote} />
                </Tooltip>
            </p>

            <p className={hasDownVoted ? "text-red-600" : ""}>
                <Tooltip title="Downvote this post">
                    <DownOutlined onClick={downVote} />
                </Tooltip>
            </p>

            <p>{number}</p>
        </div>
    );
}
