import { Alert, Input, Modal } from "antd"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { API } from "../../../api/ApiHandler"

const useAddFriendModal = (onAdd: () => void): [JSX.Element, () => void] => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const ref = React.createRef<Input>()

    const addUser = async () => {
        setLoading(true)

        const user = ref.current?.state.value

        if (user === "") {
            setError("Username can't be blank!")
            setLoading(false)
        }

        const form = new FormData()
        form.append("name", user)

        const response = await API.put("/user/friends/name", form)

        if (response.status !== 200) {
            setError(response.data.payload)
        } else {
            setVisible(false)
            ref.current?.setState({ })
            toast.success("Sent a friend request!")
            onAdd()
        }

        setLoading(false)
    }

    return [
        <Modal
            visible={visible}
            onCancel={() => setVisible(false)}
            okText="Add"
            confirmLoading={loading}
            onOk={addUser}
        >
            <h3>Username</h3>
            <Input ref={ref}></Input>

            {error !== "" && (
                <Alert showIcon={true} message={error} type="error"></Alert>
            )}
        </Modal>,
        () => setVisible(prev => !prev),
    ]
}

export default useAddFriendModal
