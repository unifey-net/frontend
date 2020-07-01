import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import {SelfView} from "../api/user/View";
import history from "../api/History"

export default function Header() {
    let [page, setPage] = useState(window.location.pathname)

    useEffect(() => {
        history.listen(path => {
            setPage(path.pathname);
        })

        return () => {}
    }, [])

    let pages = [
        {
            name: "Home",
            location: "/"
        },
        {
            name: "About Us",
            location: "/about"
        },
        {
            name: "Communities",
            location: "/communities"
        }
    ];

    return (
        <div className="site-header">
            <div className="title">
                <Link to="/" className="unifey">
                    <img src="/favicon.png" width={48} height={48} alt="Unifey Logo" />
                </Link>
            </div>
            <div>
                <ul className="site-header-links">
                    {pages.map((obj, index) => (
                        <li key={index}>
                            {page === obj.location && (
                                <Link
                                    style={{ color: "lightgreen" }}
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
        </div>
    );
}
