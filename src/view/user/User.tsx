import { useRouteMatch } from "react-router-dom"
import React, { useEffect, useState } from "react"

import { getUserByName, signedIn, getImageUrl } from "../../api/user/User"
import Feed from "../../components/feed/FeedSkeleton"

import { Empty, Spin } from "antd"
import Avatar from "antd/es/avatar"

import { LoadingOutlined } from "@ant-design/icons"

import { getBadges } from "../../api/user/Cosmetics"
import UserProfile from "../../components/user/profile/UserProfile"
import UserBadges from "../../components/user/UserBadges"
import { useDefaultEmotes } from "../../api/community/useEmotes"
import FeedController from "../../components/feed/controller/FeedController"
import FocusedPost from "../../components/feed/post/FocusedPost"

export default function User() {
    const {
        params: { name, post },
    } = useRouteMatch()

    useDefaultEmotes()

    let [user, setUser] = useState({} as any)
    let [loaded, setLoaded] = useState({
        error: false,
        loaded: false,
    })

    useEffect(() => {
        const loadUser = async () => {
            let response = await getUserByName(name)

            if (response == null || response.status !== 200) {
                setLoaded({
                    error: true,
                    loaded: true,
                })
            } else {
                setUser(response.data)

                setUser((prevState: any) => {
                    return {
                        ...prevState,
                        badges: getBadges(prevState.profile.cosmetics),
                    }
                })

                setLoaded({
                    error: false,
                    loaded: true,
                })
            }
        }

        loadUser()
    }, [name])

    if (!loaded.loaded)
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="empty-container">
                    <Spin indicator={<LoadingOutlined />}></Spin>
                </div>
            </div>
        )

    if (loaded.error && loaded.loaded) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="empty-container">
                    <Empty description={"That user could not be found."} />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col lg:block">
                <h1 className="text-3xl lg:text-4xl">
                    {user.username}{" "}
                    <Avatar size={64} src={getImageUrl(user.username)} />
                    <UserBadges badges={user.badges} />
                </h1>

                <div className="block mb-6 lg:hidden">
                    <UserProfile user={user} />
                </div>
            </div>

            <div className="block lg:flex lg:flex-row lg:justify-between lg:gap-16">
                {!post && (
                    <FeedController
                        id={`uf_${user.id}`}
                        usePostbox={signedIn()}
                    />
                )}
                {post && <FocusedPost postId={post} feed={`uf_${user.id}`} />}

                <UserProfile user={user} />
            </div>
        </div>
    )
}
