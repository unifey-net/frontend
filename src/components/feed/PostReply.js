import React, { useState } from "react";
import { Modal, Form, Input, Alert, message } from "antd";
import { signedIn } from "../../api/user/User";
import { API } from "../../api/ApiHandler";

const { TextArea } = Input;

const ReplyModal = ({ visible, onCreate, onCancel, loading, error }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title="Reply"
            okText="Post Reply"
            cancelText="Cancel"
            onCancel={onCancel}
            confirmLoading={loading}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            {error !== "" && (
                <Alert
                    type="error"
                    message="There was an issue posting that comment."
                    description={error}
                    showIcon
                    style={{
                        marginBottom: "2rem",
                    }}
                />
            )}

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: "public",
                }}
            >
                <Form.Item
                    name="comment"
                    label="Comment"
                    rules={[
                        {
                            required: true,
                            message: "Please input something to reply with!",
                        },
                    ]}
                >
                    <TextArea rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default function PostReply({ feed, level, post, id }) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (values) => {
        setLoading(true);

        let form = new FormData();

        form.append("content", values["comment"]);

        switch (level) {
            case 0: {
                let req = await API.put(
                    `/feeds/${feed}/post/${post}/comments`,
                    form
                );

                if (req.status !== 200) {
                    setError(req.data.payload);
                } else {
                    setVisible(false);
                    message.success("Posted reply!");
                }
                break;
            }

            case 1: {
                let req = await API.put(
                    `/feeds/${feed}/post/${post}/comments/${id}`,
                    form
                );

                if (req.status !== 200) {
                    setError(req.data.payload);
                } else {
                    setVisible(false);
                    message.success("Posted reply!");
                }
                break;
            }
        }

        setLoading(false);
    };

    return (
        <>
            {signedIn() && (
                <>
                    <span
                        key="comment-nested-reply-to"
                        className="ml-4"
                        onClick={() => setVisible(true)}
                    >
                        Reply to
                    </span>
                    <ReplyModal
                        visible={visible}
                        onCreate={submit}
                        onCancel={() => {
                            setVisible(false);
                            setLoading(false);
                            setError("");
                        }}
                        loading={loading}
                        error={error}
                    />
                </>
            )}
        </>
    );
}
