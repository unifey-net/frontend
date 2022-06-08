import React, { useState } from "react"
import { CommunityRequest } from "../../../../../api/community/CommunityUtil"
import { Form, Alert, Select, message, Input } from "antd"
import Modal from "antd/lib/modal/Modal"
import { Option } from "antd/lib/mentions"
import { API } from "../../../../../api/ApiHandler"
import { UserRole } from "../../../../../api/community/Roles"

/**
 * Set a user's role modal.
 *
 * target? is undefined-able because you don't need to set on
 */
export default (
    community: CommunityRequest
): [JSX.Element, () => void, UserRole] => {
    let [form] = Form.useForm()

    const [visible, setVisible] = useState(false) // modal visibility
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [newRole, setNewRole] = useState({
        id: -1,
        name: "",
        role: -1,
    } as UserRole)

    const verifyName = async (name: string): Promise<number> => {
        const request = await API.get(
            `/community/${community.community.id}/verifyname?name=${name}`
        )

        if (request.status === 200 && request.data.payload !== null) {
            return request.data.payload
        } else return -1
    }

    const onOk = async () => {
        setLoading(true)

        const store = await form.validateFields()

        const { role, name } = store

        const id = await verifyName(name)

        if (id === -1) {
            setError(
                "That name could not be found! Remember, they must be a member of the community."
            )
            setLoading(false)
            return
        }

        let formData = new FormData()

        formData.append("target", `${id}`)
        formData.append("role", role)

        const request = await API.post(
            `/community/${community.community.id}/roles`,
            formData
        )

        if (request.status === 200) {
            setNewRole({
                name,
                role: +role,
                id: +id,
            })

            setVisible(false)
            form.resetFields()
            message.success("Successfully updated roles!")
        } else {
            setError(request.data.payload)
        }

        setLoading(false)
    }

    return [
        <Modal
            visible={visible}
            title="Set a user's role"
            okText="Set"
            cancelText="Cancel"
            confirmLoading={loading}
            onOk={onOk}
            onCancel={() => {
                setVisible(false)
                setLoading(false)
                setError("")
                form.resetFields()
            }}
        >
            {error !== "" && <Alert message={error} showIcon type="error" />}

            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Username">
                    <Input />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Role"
                    rules={[
                        {
                            required: true,
                            message: "Please select the role for the user.",
                        },
                    ]}
                >
                    <Select placeholder="Select the user's role." allowClear>
                        <Option value="3" disabled={community.selfRole !== 4}>
                            Administrator
                        </Option>
                        <Option value="2">Moderator</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>,
        () => {
            setVisible(prev => !prev)
        },
        newRole,
    ]
}
