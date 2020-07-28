import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import history from "../api/History";
import SelfView from "./view/SelfView";

export default (): JSX.Element => {
    let [page, setPage] = useState(window.location.pathname);

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
            name: "About",
            location: "/about"
        },
        {
            name: "Communities",
            location: "/communities"
        },
        {
            name: "Beta",
            location: "/beta"
        }
    ];

    return (
        <div
            className="flex justify-evenly bg-transparent pt-2 mb-4 header"
        >
            <div className="mb-2">
                <Link to="/">
                    <img
                        src="/favicon.png"
                        width={48}
                        height={48}
                        alt="Unifey Logo"
                    />
                </Link>
            </div>
            <div className="mt-2">
                <ul className="flex flex-row gap-4">
                    {pages.map((obj, index) => (
                        <li key={index} className="text-sm mt-1 md:text-md lg:mt-0 lg:text-lg">
                            {page === obj.location && (
                                <Link className="text-green-200" to={obj.location}>
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
            <SelfView/>
        </div>
    );
}
