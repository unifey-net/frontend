import React, { useState } from "react";
import { CommunityRequest } from "../../../../../../api/community/CommunityUtil";
import useInputModal from "../useInputModal";
import { Store } from "antd/lib/form/interface";
import { Button, Form, Input, Tooltip } from "antd";
import { API } from "../../../../../../api/ApiHandler";

type Props = {
    community: CommunityRequest;
};

export default ({ community }: Props) => {
    // the name change cooldown. if this is not -1, then it is the timestamp when the name change will be available.
    const [cooldown, setCooldown] = useState(-1)

    let [modal, toggle] = useInputModal(
        async (store: Store) => {
            let { password, name } = store

            let form = new FormData()

            form.append("password", password)
            form.append("name", name)

            let request = await API.put(`/community/${community.community.id}/name`, form)
            
            return request.status === 200 ? "" : request.data.payload;
        },
        [
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
    );

    return (
        <div>
            <h3>Name</h3>
            <p>
                You can only change the name of a community once every 30 days.
            </p>

            {cooldown === -1 && (
                <Button type="primary" onClick={toggle} disabled>
                    Change
                </Button>
            )}

            {cooldown !== -1 && (
                <Tooltip title={`Name change will be available on ${new Date(cooldown).toLocaleString()}.`}>
                    <Button type="primary" onClick={toggle} disabled>
                        Change
                    </Button>
                </Tooltip>
            )}

            {modal}
        </div>
    );
};
