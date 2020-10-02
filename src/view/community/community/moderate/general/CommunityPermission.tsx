import React, { useState } from "react";
import { CommunityRequest } from "../../../../../api/community/CommunityUtil";
import { Radio, Tooltip, Button } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

type Props = {
    action: string;
    community: CommunityRequest;
    title: string;
    desc: string;
    initialValue: number;
    save: (value: number) => Promise<void>;
};

export default ({
    action,
    community,
    title,
    desc,
    initialValue,
    save,
}: Props) => {
    const [pre, setPre] = useState(initialValue);
    const [value, setValue] = useState(initialValue);
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <h3>{title}</h3>
            <p>{desc}</p>

            <Radio.Group
                onChange={(value: RadioChangeEvent) =>
                    setValue(value.target.value)
                }
                value={value}
            >
                <Tooltip title={"Anyone can " + action}>
                    <Radio value={1}>Default</Radio>
                </Tooltip>
                <Tooltip title={"You must be a member to " + action}>
                    <Radio value={2}>Member</Radio>
                </Tooltip>
                <Tooltip title={"You must be a moderator to " + action}>
                    <Radio value={3}>Moderator</Radio>
                </Tooltip>
                <Tooltip title={"You must be an administrator to " + action}>
                    <Radio value={4}>Administrator</Radio>
                </Tooltip>
            </Radio.Group>

            {pre !== value && (
                <Button
                    type="primary"
                    loading={loading}
                    onClick={async () => {
                        setLoading(true)
                        await save(value);
                        setLoading(false)
                        
                        setPre(value);
                    }}
                >
                    Save
                </Button>
            )}
        </div>
    );
};
