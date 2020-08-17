import React, { useState } from "react";
import { message, Input, Button, Modal } from "antd";
import { createPost } from "../../api/Feeds";

const { TextArea } = Input;

type Props = {
    feed: string,
    action: any
}

export default ({ feed, action}: Props): JSX.Element => {
    let [visible, setVisible] = useState(false);
    let [loading, setLoading] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        setLoading(true);

        let title = document.querySelector("#title") as HTMLInputElement;
        let content = document.querySelector("#content") as HTMLInputElement;

        if (title.value === "" || content.value === "") {
            (document.querySelector("#status") as HTMLParagraphElement).textContent = "You are missing a title or body!";
            setLoading(false);
            return;
        }

        let response = await createPost(feed, content.value, title.value);

        setLoading(false);
        setVisible(false);

        if (response.status !== 200) {
            message.error("There was an issue posting that.")
        } else {
            message.success("Successfully posted!");
        }

        action();
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div className="post-box-container">
            <Button type="link" onClick={showModal}>
                Create Post
            </Button>

            <Modal
                title="Create new Post"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Submit
                    </Button>,
                ]}
            >
                <Input id="title" placeholder="Title" />

                <br />
                <br />

                <TextArea
                    id="content"
                    placeholder="Body"
                    autoSize={{ minRows: 3 }}
                />

                <br />
                <br />

                <p id="status" />
            </Modal>
        </div>
    );
}
