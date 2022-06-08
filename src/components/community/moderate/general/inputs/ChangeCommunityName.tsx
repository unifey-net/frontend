import React, { useState } from "react"
import { CommunityRequest } from "../../../../../api/community/CommunityUtil"
import useInputModal from "../useInputModal"
import { Store } from "antd/lib/form/interface"
import { Button, Form, Input, Tooltip } from "antd"
import { API } from "../../../../../api/ApiHandler"
import toast from "react-hot-toast"

type Props = {
    community: CommunityRequest
}

const ChangeCommunityName: React.FC<Props> = ({ community }) => {
    const [cooldown, setCooldown] = useState(-1)

    const onOk = async (store: Store) => {
        let { password, name } = store

        let form = new FormData()

        form.append("password", password)
        form.append("name", name)

        let request = await API.put(
            `/community/${community.community.id}/name`,
            form
        )

        switch (request.status) {
            case 200: {
                toast.success(
                    "The communites name has successfully been changed!"
                )
                return ""
            }

            case 429: {
                const retryWhen = request.headers["x-rate-limit-reset"]
                const date = new Date(+retryWhen)

                setCooldown(+retryWhen)

                return `You can change the name at ${date.toLocaleString()}.`
            }

            default: {
                return request.data.payload
            }
        }
    }

    const forms = [
        <Form.Item
            name="name"
            label="New Name"
            rules={[
                {
                    required: true,
                    message: "Please input the communities new name!",
                },
                {
                    max: 16,
                    message: "The name cannot be over 16 characters!",
                },
                {
                    min: 3,
                    message: "The name cannot be under 3 characters!",
                },
                {
                    pattern: /^[A-Za-z0-9-_]\w+$/,
                    message:
                        "The name can only contain alphanumerics, - and _!",
                },
            ]}
        >
            <Input />
        </Form.Item>,
        <Form.Item
            name="password"
            label="Your password"
            rules={[
                {
                    required: true,
                    message: "Please input the communities new name!",
                },
            ]}
        >
            <Input.Password />
        </Form.Item>,
    ]

    let [modal, toggle] = useInputModal(onOk, forms)

    return (
        <div>
            <h3>Name</h3>

            {cooldown === -1 && (
                <Button type="primary" onClick={toggle}>
                    Change
                </Button>
            )}

            {cooldown !== -1 && (
                <Tooltip
                    title={`Name change will be available on ${new Date(
                        cooldown
                    ).toLocaleString()}.`}
                >
                    <Button type="primary" onClick={toggle} disabled>
                        Change
                    </Button>
                </Tooltip>
            )}

            {modal}
        </div>
    )
}

export default ChangeCommunityName
