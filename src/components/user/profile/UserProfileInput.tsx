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

const UserProfileInput: React.FC<Props> = ({
    type,
    initialValue,
    update,
    editing,
    hideTitle,
}) => {
    let input = React.createRef<Input>()

    // if the value is changed, that becomes the new initial value.
    let [initValue, setInitValue] = useState(initialValue)

    let [value, setValue] = useState(initialValue)
    let [creating, setCreating] = useState(false)
    let [loading, setLoading] = useState(false)
    let [disabled, setDisabled] = useState(true)

    let updateValue = async () => {
        setLoading(true)

        const newString = input.current!!.state.value as string

        setInitValue(newString)

        await update(newString)

        setLoading(false)
        setDisabled(true) // manually update it since onChange doesn't update after save
    }

    return (
        <>
            {(creating || editing) && (
                <div>
                    {!hideTitle && <h2 className="text-lg">{type}</h2>}

                    <Input
                        ref={input}
                        value={value}
                        onChange={(
                            inputValue: ChangeEvent<HTMLInputElement>
                        ) => {
                            setValue(inputValue.target.value)
                            setDisabled(
                                inputValue.target.value.length === 0 ||
                                    inputValue.target.value === initValue
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

export default UserProfileInput
