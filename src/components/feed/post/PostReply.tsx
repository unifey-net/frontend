import React, { useState } from "react"
import { Modal, Form, Input, Alert } from "antd"
import { signedIn } from "../../../api/user/User"
import { Store } from "antd/lib/form/interface"
import { createComment } from "../../../api/Feeds"
import toast from "react-hot-toast"
import styled from "styled-components"

const { TextArea } = Input

type ReplyModalProps = {
    visible: boolean
    loading: boolean
    error: string
    onCreate: (values: Store) => Promise<void>
    onCancel: () => void
}

const ReplyModal: React.FC<ReplyModalProps> = ({
    visible,
    onCreate,
    onCancel,
    loading,
    error,
}) => {
    const [form] = Form.useForm()

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
                    .then(values => {
                        form.resetFields()
                        onCreate(values)
                    })
                    .catch(info => {
                        console.log("Validate Failed:", info)
                    })
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
    )
}

type Props = {
    feed: string
    level: number
    post: number
    id?: number
    isOnComment: boolean
}

const ReplyButton = styled.button<{ isOnComment: boolean }>`
    ${({ isOnComment }) => (isOnComment ? "margin-bottom: 16px;" : "")}
`

const PostReply: React.FC<Props> = ({ feed, level, post, id, isOnComment }) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const submit = async (values: Store) => {
        setLoading(true)

        let request = await createComment(feed, post, values["comment"], {
            level,
            id,
        })

        if (request.status !== 200) {
            setError(request.data.payload)
        } else {
            setVisible(false)
            window.location.reload()
            toast.success("Successfully posted reply!")
        }

        setLoading(false)
    }

    return (
        <>
            {signedIn() && (
                <>
                    <ReplyButton
                        isOnComment={isOnComment}
                        onClick={() => setVisible(true)}
                    >
                        {isOnComment ? "Reply" : "Add Comment"}
                    </ReplyButton>

                    <ReplyModal
                        visible={visible}
                        onCreate={submit}
                        onCancel={() => {
                            setVisible(false)
                            setLoading(false)
                            setError("")
                        }}
                        loading={loading}
                        error={error}
                    />
                </>
            )}
        </>
    )
}

export default PostReply
