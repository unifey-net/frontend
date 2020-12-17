import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "antd"

type Props = {
    name: string
    input: JSX.Element
    update: () => Promise<void>
}

export default ({ name, input, update }: Props) => {
    let [loading, setLoading] = useState(false)

    let self = useSelector((store: any) => store.auth.user)

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg">{name}</h3>

            {input}

            <Button
                ghost
                loading={loading}
                onClick={() => {
                    setLoading(true)

                    update().then(() => setLoading(false))
                }}
                disabled={!self.verified}
            >
                Update {name}
            </Button>
        </div>
    )
}
