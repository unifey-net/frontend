import React, { useState, useEffect } from "react"
import { getAllCommunities } from "../../../api/community/Community"

import { Spin, Empty } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

import Community from "../../../components/community/communities/Community"
import DefaultContainer from "../../../components/DefaultContainer"
import styled from "styled-components"

const CommunitiesStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .communities {
        max-width: 600px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
`

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

    if (!loaded) {
        return <DefaultContainer>
            <Spin indicator={<LoadingOutlined />} />
        </DefaultContainer>
    }

    return (
        <CommunitiesStyle>
            <h1>Top Communities</h1>

            {communities.length === 0 && loaded && (
                <Empty description="There aren't any communities available." />
            )}

            {communities.length !== 0 && loaded && (
                <div className="communities">
                    {communities.map((community, index) => (
                        <Community index={index} community={community} />
                    ))}
                </div>
            )}
        </CommunitiesStyle>
    )
}

export default Communities
