import { useRouteMatch } from "react-router-dom"
import React from "react"
import Feed from "../../../components/feed/FeedSkeleton"
import { Empty, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import CommunityStaff from "../../../components/community/CommunityStaff"
import { useCommunity } from "../../../api/community/CommunityUtil"
import { useCommunityEmotes } from "../../../api/community/useEmotes"
import DesktopCommunityProfile from "../../../components/community/profile/DesktopCommunityProfile"
import MobileCommunityProfile from "../../../components/community/profile/MobileCommunityProfile"
import CommunityProfileRules from "../../../components/community/rules/CommunityProfileRules"
import { COMPLETE, LOADING, ERROR } from "../../../api/util/Status"
import FeedController from "../../../components/feed/controller/FeedController"
import FocusedPost from "../../../components/feed/post/FocusedPost"
import styled from "styled-components"
import { STATUS_ENTER } from "rc-motion/lib/interface"
import DefaultContainer from "../../../components/DefaultContainer"
import JoinCommunity from "../../../components/community/profile/JoinCommunity"
import { media } from "../../../api/util/Media"
import { useState } from "react"
import Post from "../../../components/feed/post/Post"

const CommunityStyle = styled.div<{ mobileSection: number }>`
    display: flex;
    flex-direction: column;

    .community-name-container {
        ${media(
            "align-items: center;",
            "align-items: flex-start;",
            "align-items: flex-start;"
        )}

        display: flex;
        flex-direction: column;
        gap: 2px;
        background-color: #191919;
        padding: 16px;
        border-radius: 4px;
        margin-left: 16px;
        margin-right: 16px;
        margin-bottom: 16px;

        .community-name {
            margin-top: 48px;
            display: flex;
            flex-direction: row;
            gap: 8px;

            button {
                align-self: flex-start;
            }
        }

        .community-link {
            ${media(
                "margin-top: -8px;",
                "margin-top: -16px;",
                "margin-top: -32px;"
            )}
        }
    }

    .feed-details-container {
        display: flex;
        gap: 16px;
        justify-content: center;

        .mobile-context {
            display: none; // flex is set later

            flex-direction: row;
            align-items: center;
            justify-content: center;

            gap: 8px;

            button {
                background-color: transparent;
                border: 1px solid ${({ theme }) => theme.secondary};
                padding: 4px 8px;
                border-radius: 8px;
            }
        }

        ${media(
            `
                .feed-section, .mobile-about-section {
                    display: flex;
                    justify-content: center;
                    flex-direction: row;
                }

                .mobile-context {
                    display: flex;
                }

                flex-direction: column-reverse;

                .desktop-about-section {
                    display: none;
                }
            `,
            `
                flex-direction: row;
                .desktop-about-section {
                    display: block;
                }

                .mobile-about-section {
                    display: none;
                }
            `,
            `
                flex-direction: row;
                .desktop-about-section {
                    display: block;
                }

                .mobile-about-section {
                    display: none;
                }
            `
        )}

        ${props =>
            props.mobileSection === 0
                ? `
                    .feed-section {
                        display: flex;
                    }
                    .mobile-about-section {
                        display: none;
                    }
                `
                : `
                    .mobile-about-section {
                        display: flex;
                    }
                    
                    .feed-section {
                        display: none;
                    }
                `}
    }
`

/**
 * A community viewer.
 * @param {*} props
 */
export default function Community() {
    const {
        params: { name, post },
    } = useRouteMatch()

    console.log(post)

    let [mobileSection, setMobileSection] = useState(0)
    let [community, status] = useCommunity(name)

    useCommunityEmotes(
        community?.emotes === undefined ? [] : community?.emotes!!
    )

    if (community && community.community.viewRole > community.selfRole)
        return (
            <Empty description="You don't have permission to view this community." />
        )

    if (status.status === LOADING)
        return (
            <DefaultContainer>
                <Spin indicator={<LoadingOutlined />}></Spin>
            </DefaultContainer>
        )

    if (status.status === ERROR || community == null)
        return (
            <DefaultContainer>
                <Empty description="That community could not be found." />
            </DefaultContainer>
        )

    return (
        <CommunityStyle mobileSection={mobileSection}>
            <>
                <div className="community-name-container">
                    <div className="community-name">
                        <h1>{community.community.name}</h1>
                        <JoinCommunity onClick={() => {}}>
                            + Join Community
                        </JoinCommunity>
                    </div>
                    <h6 className="community-link">
                        c/{community.community.name}
                    </h6>
                </div>

                <br />

                <div className="feed-details-container">
                    <div className="feed-section">
                        {!post && (
                            <FeedController
                                id={`cf_${community.community.id}`}
                                usePostbox={
                                    community.selfRole >=
                                    community.community.postRole
                                }
                            />
                        )}

                        {post && (
                            <FocusedPost
                                postId={post}
                                feed={community.feed.id}
                            />
                        )}
                    </div>

                    <div className="mobile-about-section">
                        <MobileCommunityProfile community={community} />
                    </div>

                    <div className="desktop-about-section">
                        <DesktopCommunityProfile community={community} />
                    </div>

                    <div className="mobile-context">
                        <button onClick={() => setMobileSection(0)}>
                            Feed
                        </button>
                        <button onClick={() => setMobileSection(1)}>
                            About
                        </button>
                    </div>
                </div>
            </>
        </CommunityStyle>
    )
}
