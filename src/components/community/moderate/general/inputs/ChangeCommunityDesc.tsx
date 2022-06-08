import React from "react"
import { CommunityRequest } from "../../../../../api/community/CommunityUtil"
import useInputModal from "../useInputModal"
import { Store } from "antd/lib/form/interface"
import { Form, Input, Button } from "antd"
import { updateCommunityDescription } from "../../../../../api/community/Community"

type Props = {
    community: CommunityRequest
}

/**
 * Change a communities description.
 */
const ChangeCommunityDesc: React.FC<Props> = ({ community }) => {
    const onOk = async (store: Store) => {
        let { desc } = store

        let request = await updateCommunityDescription(
            desc,
            community.community.id
        )

        return request.status === 200 ? "" : request.data.payload
    }

    const form = [
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

    let [modal, toggle] = useInputModal(onOk, form)

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

export default ChangeCommunityDesc
