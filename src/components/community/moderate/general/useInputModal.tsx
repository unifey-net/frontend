import React from "react"
import { Form, Modal, Alert } from "antd"
import { useState } from "react"
import { Store } from "antd/lib/form/interface"

const useInputModal = (
    callback: (store: Store) => Promise<string>,
    items: JSX.Element[]
): [JSX.Element, () => void] => {
    let [form] = Form.useForm()

    const [visible, setVisible] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const onOk = async () => {
        setLoading(true)

        const store = await form.validateFields()

        let response = await callback(store)

        if (response === "") {
            setVisible(false)
            form.resetFields()
        } else {
            setError(response)
        }

        setLoading(false)
    }

    return [
        <Modal
            visible={visible}
            title="Modify a Community"
            okText="Update"
            cancelText="Cancel"
            confirmLoading={loading}
            onOk={onOk}
            onCancel={() => {
                setVisible(false)
                setLoading(false)
                form.resetFields()
            }}
        >
            {error !== "" && <Alert message={error} showIcon type="error" />}

            <Form form={form} layout="vertical">
                {items}
            </Form>
        </Modal>,
        () => setVisible(prev => !prev),
    ]
}

export default useInputModal;