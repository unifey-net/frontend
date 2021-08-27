import React, { useState } from "react"
import { Radio, Tooltip, Button } from "antd"
import { RadioChangeEvent } from "antd/lib/radio"

type Props = {
    action: string
    title: string
    desc: string
    initialValue: number
    save: (value: number) => Promise<void>
}

/**
 * Change an action to have a required permission level.
 */
const CommunityPermission: React.FC<Props> = ({
    action,
    title,
    desc,
    initialValue,
    save,
}) => {
    const [pre, setPre] = useState(initialValue)
    const [value, setValue] = useState(initialValue)
    const [loading, setLoading] = useState(false)

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
                    <Radio value={0}>Default</Radio>
                </Tooltip>
                <Tooltip title={"You must be a member to " + action}>
                    <Radio value={1}>Member</Radio>
                </Tooltip>
                <Tooltip title={"You must be a moderator to " + action}>
                    <Radio value={2}>Moderator</Radio>
                </Tooltip>
                <Tooltip title={"You must be an administrator to " + action}>
                    <Radio value={3}>Administrator</Radio>
                </Tooltip>
            </Radio.Group>

            {pre !== value && (
                <Button
                    type="primary"
                    loading={loading}
                    onClick={async () => {
                        setLoading(true)
                        await save(value)
                        setLoading(false)

                        setPre(value)
                    }}
                >
                    Save
                </Button>
            )}
        </div>
    )
}

export default CommunityPermission
