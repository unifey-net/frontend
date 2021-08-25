import React, { useState } from "react"
import { Input, Alert, Radio } from "antd"
import Modal from "antd/lib/modal/Modal"
import CommentObject from "../../../api/Comment"
import { Post } from "../../../api/Feeds"
import { sendReport } from "../../../api/Reports"
import { RadioChangeEvent } from "antd/lib/radio"
import toast from "react-hot-toast"

const { TextArea } = Input

const usePostReport = (post: Post | CommentObject): [() => void, JSX.Element] => {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [error, setError] = useState("")
    const [reason, setReason] = useState("UNIFEY" as "UNIFEY" | "COMMUNITY")

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
        toast.success("Successfully reported post.")
    }

    const closeReport = () => {
        // i have no idea why this works and without settimeout it doesn't, but at this point I just give up.
        setTimeout(() => {
            setVisible(prev => !prev)
        }, 0)
    }

    const modal = (
        <Modal
            title="Report this Post."
            visible={visible}
            onOk={submitReport}
            onCancel={closeReport}
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
                <div className="flex flex-col gap-2 mb-4">
                    <div>
                        <Radio value={"COMMUNITY"}>
                            Report to Community Moderators
                        </Radio>

                        <br />

                        <span className="text-sm">
                            This post doesn't fit the topic, contains something
                            against the community rules, or is generally
                            unacceptable for this community.
                        </span>
                    </div>

                    <div>
                        <Radio value={"UNIFEY"}>
                            Report to Unifey staff members
                        </Radio>

                        <br />

                        <span className="text-sm">
                            This post isn't following Unifey's terms of service
                            or is hacked.
                        </span>
                    </div>
                </div>
            </Radio.Group>

            <h2 className="text-lg">
                Extra Details{" "}
                <span className="text-sm text-gray-700">(not required)</span>
            </h2>
            <TextArea id="report-post" rows={4} />
        </Modal>
    )

    return [() => setVisible(true), modal]
}

export default usePostReport