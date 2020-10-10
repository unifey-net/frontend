import React, { useState } from "react"
import { Input, Alert, message, Radio } from "antd"
import Modal from "antd/lib/modal/Modal"
import { FlagOutlined } from "@ant-design/icons"
import CommentObject from "../../../api/Comment"
import { Post } from "../../../api/Feeds"
import { sendReport } from "../../../api/Reports"
import { RadioChangeEvent } from "antd/lib/radio"

const { TextArea } = Input

type Props = {
    post: Post | CommentObject
}

export default ({ post }: Props) => {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [error, setError] = useState("")
    const [reason, setReason] = useState(
        "SPAM" as "SPAM" | "DOES_NOT_FIT_TOPIC"
    )

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

        const type = (post as CommentObject).parent ? "COMMENT" : "POST"

        let req = await sendReport({ id: post.id, type }, reason, report.value)

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
                            marginBottom: "2rem",
                        }}
                    />
                )}

                <h2 className="text-lg">Reason for report.</h2>

                <Radio.Group
                    onChange={(value: RadioChangeEvent) =>
                        setReason(value.target.value)
                    }
                    value={reason}
                >
                    <Radio value={"SPAM"}>Spam</Radio>
                    <Radio value={"DOES_NOT_FIT_TOPIC"}>
                        Does not fit topic
                    </Radio>
                </Radio.Group>

                <TextArea id="report-post" rows={4} />
            </Modal>
        </>
    )
}
