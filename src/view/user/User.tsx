import { Route, Routes, useMatch } from "react-router-dom"
import React, { useEffect, useState } from "react"

import { getUserByName, signedIn, getImageUrl, User } from "../../api/user/User"

import { Empty, Spin } from "antd"
import Avatar from "antd/es/avatar"

import { LoadingOutlined } from "@ant-design/icons"

import { getBadges, Cosmetic } from "../../api/user/Cosmetics"
import UserProfile from "../../components/user/profile/UserProfile"
import UserBadges from "../../components/user/UserBadges"
import { useDefaultEmotes } from "../../api/community/useEmotes"
import FeedController from "../../components/feed/controller/FeedController"
import FocusedPost from "../../components/feed/post/FocusedPost"
import styled from "styled-components"
import DefaultContainer from "../../components/DefaultContainer"
import { desktopMedia, media } from "../../api/util/Media"
import { UserResponse } from "../../components/user/UserResponse"
import useQueryParameterTabs from "../../components/useQueryParameterTabs"

const UserStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .row-two {
        display: flex;
        flex-direction: row;
        gap: 4rem;
    }

    .row-one {
        display: flex;
        flex-direction: row;
        gap: 4rem;

        h1 {
            font-size: 1.875rem;
            line-height: 2.25rem;

            ${desktopMedia(`
                font-size: 2.25rem;
                line-height: 2.5rem;
            `)}
        }

        .mobile-profile {
            ${media("display: block;", "display: none;", "display: none;")}
        }
    }
`

type MatchParams = {
    name: string
    post: string
}

const UserView = () => {
    const match = useMatch("/u/:name")
    const name = match?.params.name

    useDefaultEmotes()

    let [{ user, member, profile }, setUser] = useState({} as UserResponse)
    let [badges, setBadges] = useState([] as Cosmetic[])
    let [loaded, setLoaded] = useState({
        error: false,
        loaded: false,
    })

    useEffect(() => {
        const loadUser = async () => {
            if (name != null) {
                let response = await getUserByName(name)

                if (response == null || response.status !== 200) {
                    setLoaded({
                        error: true,
                        loaded: true,
                    })
                } else {
                    setUser(response.data)
                    setBadges(response.data.profile.cosmetics)

                    setLoaded({
                        error: false,
                        loaded: true,
                    })
                }
            }
        }

        loadUser()
    }, [name])

    if (!loaded.loaded)
        return (
            <DefaultContainer>
                <Spin indicator={<LoadingOutlined />}></Spin>
            </DefaultContainer>
        )

    if (loaded.error && loaded.loaded) {
        return (
            <DefaultContainer>
                <Empty description={"That user could not be found."} />
            </DefaultContainer>
        )
    }

    return (
        <UserStyle>
            <div className="row-one">
                <h1>
                    {user.username}{" "}
                    <Avatar size={64} src={getImageUrl(user.username)} />
                    <UserBadges badges={badges} />
                </h1>

                <div className="mobile-profile">
                    <UserProfile user={user} type="mobile" />
                </div>
            </div>

            <div className="row-two">
                {/* {!post && (
                    <FeedController
                        id={`uf_${user.id}`}
                        usePostbox={signedIn()}
                    />
                )}

                {post && <FocusedPost postId={postId} feed={`uf_${user.id}`} />} */}

                <UserProfile user={user} />
            </div>
        </UserStyle>
    )
}

export default UserView
