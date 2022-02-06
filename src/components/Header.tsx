import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import history from "../api/History"
import Logo from "./logo/Logo"
import SelfView from "./view/SelfView"
import styled from "styled-components"
import { desktopMedia, media, mediaWithTag, tinyPhoneMedia } from "../api/util/Media"

const HeaderStyle = styled.div`
    height: 64px;
    display: flex;
    padding-right: 8px;
    padding-left: 8px;

    ${media(
        `justify-content: space-between;`,
        `justify-content: space-between;`,
        `justify-content: space-evenly;
        padding: 0;
        `
    )}
    margin-bottom: 1rem;
    padding-top: 0.5rem;
    background-color: ${({ theme }) => theme.secondary};

    .logo {
        margin-bottom: 8px;
        display: block;
        ${tinyPhoneMedia("display: none;")}
        ${desktopMedia(`margin-top: 8px;`)}
    }

    .selfView {
        margin-top: 6px;
        ${desktopMedia(`margin-top: 8px;`)}
    }

    .links {
        margin-top: 0.5rem;

        .active {
            color: #c6f6d5;
        }

        display: flex;
        flex-direction: row;
        margin-top: 12px;
        ${desktopMedia(`margin-top: 16px;`)}

        a {
            ${media(
                `
                    	font-size: 0.875rem;
                        line-height: 1.25rem;
                    `,
                `
                        font-size: 1.2rem;
                        line-height: 1.5rem;
                    `,
                `
                        font-size: 1.5rem;
                        line-height: 1.75rem;
                    `
            )}
        }
    }
`

const HeaderLink = styled.div<{ isLast: boolean }>`
    a {
        ${({ isLast }) => (isLast ? "" : mediaWithTag("margin-right", "6px", "6px", "16px"))}
    }
`

const Header: React.FC = () => {
    let [page, setPage] = useState(window.location.pathname)

    useEffect(() => {
        history.listen(path => {
            setPage(path.pathname)
        })

        return () => {}
    }, [])

    let pages = [
        {
            name: "Beta",
            location: "/beta",
        },
        {
            name: "About",
            location: "/about",
        },
        {
            name: "Communities",
            location: "/communities",
        },
    ]

    return (
        <HeaderStyle>
            <div className="logo">
                <Link to="/">
                    <Logo width={48} height={48} />
                </Link>
            </div>
            <div className="links">
                {pages.map((obj, index) => (
                    <HeaderLink isLast={pages.length === (index + 1)}>
                        <Link
                            key={index}
                            className={page === obj.location ? "active" : ""}
                            to={obj.location}
                        >
                            {obj.name}
                        </Link>
                    </HeaderLink>
                ))}
            </div>
            <div className="selfView">
                <SelfView />
            </div>
        </HeaderStyle>
    )
}

export default Header
