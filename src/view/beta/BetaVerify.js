import React, { useEffect } from "react"
import { API } from "../../api/ApiHandler";
import { useDispatch } from "react-redux";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import History from "../../api/History";

export default function BetaVerify() {
    let dispatch = useDispatch();

    useEffect(() => {
        const attemptVerify = async (secret) => {
            let form = new FormData();
            form.append("verify", secret);

            let request = await API.post("/email/betaverify", form);

            History.push("/");

            if (request.status !== 200) {
                message.error("There was an issue verifying your account.");
            } else {
                message.success(
                    "You are now in the Unifey beta! You will be emailed when the beta begins."
                );
            }
        };

        let verify = new URL(window.location).searchParams.get("verify");

        if (verify !== "" && verify != undefined)
            attemptVerify(verify);
        else
            History.push("There was an issue verifying your account.")
    }, []);

    return <Spin indicator={<LoadingOutlined />} />;
}