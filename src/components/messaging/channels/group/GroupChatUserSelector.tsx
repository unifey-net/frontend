import React, { useRef, useState } from "react"
import { Select, Spin } from "antd"
import { SelectProps } from "antd/es/select"
import debounce from "lodash/debounce"
import { API } from "../../../../api/ApiHandler"

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType>, "options" | "children"> {
    fetchOptions: (search: string) => Promise<ValueType[]>
    debounceTimeout?: number
}

function DebounceSelect<
    ValueType extends {
        key?: string
        label: React.ReactNode
        value: string | number
    } = any
>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps) {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState<ValueType[]>([])
    const fetchRef = useRef(0)

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value: string) => {
            fetchRef.current += 1
            const fetchId = fetchRef.current
            setOptions([])
            setFetching(true)

            fetchOptions(value).then(newOptions => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return
                }

                setOptions(newOptions)
                setFetching(false)
            })
        }

        return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout])

    return (
        <Select<ValueType>
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    )
}

// Usage of DebounceSelect
interface UserValue {
    label: string
    value: number
}

async function fetchUserList(username: string): Promise<UserValue[]> {
    console.log("fetching user", username)

    return API.get("/user/friends/search?name=" + username).then(body =>
        body.data.payload.map((user: any) => ({
            label: user.username,
            value: user.id,
        }))
    )
}

const useGroupChatUserSelector = (): [JSX.Element, UserValue[]] => {
    const [value, setValue] = React.useState<UserValue[]>([])

    return [
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Select users"
            fetchOptions={fetchUserList}
            onChange={newValue => {
                setValue(newValue)
            }}
            style={{ width: "100%" }}
        />,
        value,
    ]
}

export default useGroupChatUserSelector
