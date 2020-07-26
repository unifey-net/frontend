import React, { useState, useEffect } from "react"
import { Input, Alert, message } from "antd"
import Modal from "antd/lib/modal/Modal"
import { FlagOutlined } from "@ant-design/icons"
import { reportPost, Post } from "../../../api/Feeds"
import { useDispatch } from "react-redux"

const { TextArea } = Input

type Props = {
    post: Post
}

export default ({ post }: Props): JSX.Element => {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [error, setError] = useState("")

    /**
     * Submit a report.
     */
    const submitReport = async () => {
        setConfirmLoading(true)

        let report = document.getElementById("report-post") as HTMLInputElement

        if (report.value === "") {
            setError("You must include a reason!")
            setConfirmLoading(false)
            return
        }

        let req = await reportPost(post.feed, post.id, report.value);

        if (req.status !== 200) {
            setError(req.data.payload)
            setConfirmLoading(false)
            return
        }

        setConfirmLoading(false)
        setVisible(false)
        message.success("Successfully reported post.")
    }

    return (
        <>
            <span onClick={() => setVisible(true)}>
                Report <FlagOutlined />
            </span>

            <Modal
                title="Report this Post."
                visible={visible}
                onOk={submitReport}
                onCancel={() => setVisible(false)}
                confirmLoading={confirmLoading}
            >
                {error !== "" && (
                    <Alert
                        type="error"
                        message="There was an issue reporting that post."
                        description={error}
                        style={{
                            marginBottom: "2rem"
                        }}
                    />
                )}

                <h2 className="text-lg">Reason for report.</h2>
                <TextArea id="report-post" rows={4} />
            </Modal>
        </>
    );
}