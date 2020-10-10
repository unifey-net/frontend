import React, { useState, ChangeEvent } from "react"
import { Input, Button } from "antd"
import Text from "antd/lib/typography/Text"

type Props = {
    type: string
    initialValue: string
    update: any
    editing: boolean
    hideTitle?: boolean
}

export default ({
    type,
    initialValue,
    update,
    editing,
    hideTitle,
}: Props): JSX.Element => {
    let input = React.createRef<Input>()

    let [value, setValue] = useState(initialValue)
    let [creating, setCreating] = useState(false)
    let [loading, setLoading] = useState(false)
    let [disabled, setDisabled] = useState(true)

    let updateValue = async () => {
        setLoading(true)

        await update(input.current!!.state.value as string)

        setLoading(false)
    }

    return (
        <>
            {(creating || editing) && (
                <div>
                    {!hideTitle && <h2 className="text-lg">{type}</h2>}

                    <Input
                        ref={input}
                        value={value}
                        onChange={(value: ChangeEvent<HTMLInputElement>) => {
                            setValue(value.target.value)
                            setDisabled(
                                value.target.value.length === 0 ||
                                    value.target.value === initialValue
                            )
                        }}
                    />

                    <Button
                        className="mt-2"
                        onClick={() => {
                            setCreating(false)
                            updateValue()
                        }}
                        disabled={disabled}
                        loading={loading}
                    >
                        Done
                    </Button>
                </div>
            )}

            {value === "" && !(editing || creating) && (
                <>
                    {!hideTitle && <h2 className="text-lg">{type}</h2>}
                    <Text>none</Text>
                </>
            )}

            {value !== "" && !(editing || creating) && (
                <>
                    {!hideTitle && <h2 className="text-lg">{type}</h2>}
                    <Text>{value}</Text>
                </>
            )}
        </>
    )
}
