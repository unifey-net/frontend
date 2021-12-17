import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import history from "../api/History"
import Logo from "./logo/Logo"
import SelfView from "./view/SelfView"
import styled from "styled-components"
import { media } from "../api/util/Media"

const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1rem;
    padding-top: 0.5rem;
    background-color: ${({ theme }) => theme.secondary};

    .logo {
        margin-bottom: 0.5rem;
    }

    .links {
        margin-top: 0.5rem;

        .active {
            color: #c6f6d5;
        }

        ul {
            display: flex;
            flex-direction: row;
            gap: 1rem;

            li {
                font-size: 0.875rem;
                line-height: 1.25rem;
                margin-top: 0.25rem;
                list-style-type: none;

                a {
                    ${media(
                        `
                    	font-size: 0.875rem;
                        line-height: 1.25rem;
                    `,
                        `
                        font-size: 1rem;
                        line-height: 1.5rem;
                    `,
                        `
                        font-size: 1.125rem;
                        line-height: 1.75rem;
                        margin-top: 0;
                    `
                    )}
                }
            }
        }
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
                <ul>
                    {pages.map((obj, index) => (
                        <li
                            key={index}
                        >
                            {page === obj.location && (
                                <Link
                                    className="active"
                                    to={obj.location}
                                >
                                    {obj.name}
                                </Link>
                            )}

                            {page !== obj.location && (
                                <Link to={obj.location}>{obj.name}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <SelfView />
        </HeaderStyle>
    )
}

export default Header
