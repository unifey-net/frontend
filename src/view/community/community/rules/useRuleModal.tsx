import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Alert, Modal, Form } from "antd";
import { API } from "../../../../api/ApiHandler";
import { addRule } from "../../../../redux/actions/community.actions";
import { useForm } from "antd/lib/form/util";
import { Store } from "antd/lib/form/interface";

const { TextArea } = Input;

/**
 * A modal used to create new rules for a community.
 */
export default (community: number): [() => void, JSX.Element] => {
    let dispatch = useDispatch();

    const [form] = useForm();

    let [visible, setVisible] = useState(false);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState((<></>) as JSX.Element);

    /**
     * When the form is submitted.
     * 
     * @param values The form's values.
     */
    const onOk = async (values: Store) => {
        setLoading(true);

        let form = new FormData();

        form.append("title", values.title);
        form.append("body", values.body);

        let request = await API.put(`/community/${community}/rules`, form);

        if (request.status !== 200) {
            setError(
                <Alert
                    showIcon
                    message="There was an issue creating that rule."
                    description={request.data.payload}
                />
            );
        } else {
            dispatch(
                addRule(
                    community,
                    values.body,
                    values.title,
                    request.data.payload
                )
            );
            setVisible(false);
        }

        setLoading(false);
    };

    /**
     * The actual modal.
     */
    const modal = (
        <Modal
            confirmLoading={loading}
            onCancel={() => {
                setVisible(false);
                form.resetFields();
            }}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        onOk(values);
                        form.resetFields();
                    })
            }}
            visible={visible}
            title="Create a new rule"
        >
            {error}

            <Form form={form}>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: "Please input the title of the rule!",
                        },
                        {
                            max: 64,
                            message: "The title cannot be over 64 characters!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="body"
                    label="Body"
                    rules={[
                        {
                            required: true,
                            message: "Please input the body of the rule!",
                        },
                        {
                            max: 256,
                            message: "The body cannot be over 256 characters!",
                        },
                    ]}
                >
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );

    return [() => setVisible((prev) => !prev), modal];
};
