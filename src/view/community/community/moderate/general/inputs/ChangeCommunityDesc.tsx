import React from "react"
import { CommunityRequest } from "../../../../../../api/community/CommunityUtil"
import useInputModal from "../useInputModal"
import { Store } from "antd/lib/form/interface"
import { Form, Input, Button } from "antd"
import { API } from "../../../../../../api/ApiHandler"

type Props = {
    community: CommunityRequest
}

export default ({ community }: Props) => {
    let [modal, toggle] = useInputModal(
        async (store: Store) => {
            let { desc } = store

            let form = new FormData()

            form.append("description", desc === undefined ? "" : desc)

            let request = await API.put(
                `/community/${community.community.id}/description`,
                form
            )

            return request.status === 200 ? "" : request.data.payload
        },
        [
            <Form.Item
                name="desc"
                label="New Description"
                rules={[
                    {
                        max: 256,
                        message: "The name cannot be over 16 characters!",
                    },
                ]}
            >
                <Input />
            </Form.Item>,
        ]
    )

    return (
        <div>
            <h3>Description</h3>
            <p>Currently: {community.community.description}</p>

            <Button type="primary" onClick={toggle}>
                Change
            </Button>

            {modal}
        </div>
    )
}
