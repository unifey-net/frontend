import React, { useState } from "react";
import { Modal, Form, Input, Alert, message, Button } from "antd";
import { signedIn } from "../../../api/user/User";
import { API } from "../../../api/ApiHandler";
import { Post } from "../../../api/Feeds";
import { Store } from "antd/lib/form/interface";

const { TextArea } = Input;

type ReplyModalProps = {
    visible: boolean,
    loading: boolean,
    error: string,
    onCreate: (values: Store) => Promise<void>,
    onCancel: () => void
}

const ReplyModal = ({ visible, onCreate, onCancel, loading, error }: ReplyModalProps): JSX.Element => {
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

type Props = {
    feed: string,
    level: number,
    post: Post,
    id?: number,
    noStyle?: boolean
}

export default ({ feed, level, post, id, noStyle }: Props): JSX.Element => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (values: Store) => {
        setLoading(true);

        let form = new FormData();

        form.append("content", values["comment"]);

        switch (level) {
            case 0: {
                let req = await API.put(
                    `/feeds/${feed}/post/${post.id}/comments`,
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
                    `/feeds/${feed}/post/${post.id}/comments/${id}`,
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
                    <Button
                        type="link"
                        className={noStyle ? "" : "m-2 -mt-2 -ml-4"}
                        onClick={() => setVisible(true)}
                    >
                        Reply to
                    </Button>

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
