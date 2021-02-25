import React, { useState, useEffect } from "react"
import { getAllCommunities } from "../../../api/community/Community"

import { Spin, Empty } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

import Community from "../../../components/community/communities/Community"
import PageHeader from "../../../components/PageHeader"

/**
 * The /communities page.
 *
 * Lists the top 10 communities. Page is still subject to change.
 */
const Communities = () => {
    let [communities, setCommunities] = useState([])
    let [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const loadCommunities = async () => {
            let data = await getAllCommunities()

            if (data.status !== 200) {
                setLoaded(true)
            } else {
                let comms = data.data

                comms.sort((a: any, b: any) => {
                    return b.size - a.size
                })

                setCommunities(comms)
                setLoaded(true)
            }
        }

        loadCommunities()
    }, [])

    const getStyle = (index: number) =>
        index + 1 !== communities.length
            ? {
                  borderBottom: "1px solid white",
              }
            : {}

    return (
        <div className="flex flex-col items-center justify-center">
            <PageHeader>Top Communities</PageHeader>

            {!loaded && (
                <Spin
                    style={{ marginTop: "4rem" }}
                    indicator={<LoadingOutlined />}
                />
            )}

            {communities.length === 0 && loaded && <Empty />}

            {communities.length !== 0 && loaded && (
                <ul className="flex flex-col max-w-sm">
                    {communities.map((community, index) => (
                        <li key={index} style={getStyle(index)}>
                            <Community index={index} community={community} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Communities
