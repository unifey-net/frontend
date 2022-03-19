import { Button, Input } from "antd"
import Modal from "antd/lib/modal/Modal"
import useModal from "antd/lib/modal/useModal"
import React, { useEffect, useState } from "react"
import toast, { ToastIcon } from "react-hot-toast"
import { useSelector } from "react-redux"
import { API } from "../../../api/ApiHandler"
import Property from "./Property"

const TwoFactor = () => {
    let [enabled, setEnabled] = useState(false)
    let [modal, contextHolder] = useModal()
    let self = useSelector((store: any) => store.auth.user)

    useEffect(() => {
        const loadEnabled = async () => {
            const request = await API.get("/user/connections/2fa")
            
            setEnabled(request.data.enabled)
        }

        loadEnabled()
    }, [])

    const toggle = async () => {
        if (enabled) {
            const request = await API.delete("/user/connections/2fa")
            
            if (request.status === 200) {
                setEnabled(false)
                toast.success("Successfully disabled two factor authorization!")
            } else {
                toast.error("There was an issue disabling two factor authorization!")
            }
        } else {
            const request = await API.put("/user/connections/2fa")

            if (request.status !== 200) {
                toast.error("There was an error enabling two factor authorization!")
            } else {
                toast.success("Two factor authorization has been enabled!")
                modal.info({
                    content: "V6BGM7DZ7WZ66VXFYEW65QFNRGKSMUK2"
                })
            }
        }
    }

    return (
        <Property>
            {contextHolder}
            <h3>Two Factor Authorization</h3>

            <div className="input">
                <div></div>
                <Button
                    ghost
                    onClick={toggle}
                    disabled={!self.verified}
                >
                    {enabled ? "Enabled" : "Disabled"}
                </Button>
            </div>
        </Property>
    )
}

export default TwoFactor
