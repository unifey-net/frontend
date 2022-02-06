import React from "react"
import styled from "styled-components"
import ExternalLink from "../../components/ExternalLink"

const AboutStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .biglogo {
        margin-bottom: 32px;
    }
`

/**
 * The /about page.
 */
const About = () => {
    return (
        <AboutStyle>
            <div className="biglogo">
                <img src="/homepage.png" alt="Large Unifey Logo" />
            </div>
            <div>
                <div>
                    <h2>What is Unifey?</h2>
                    <p>
                        Unifey is an open-source social media platform dedicated
                        to free speech and privacy.
                        <br />
                        We're currently running on a React Redux frontend with a
                        Ktor Kotlin backend.
                    </p>
                </div>

                <div>
                    <h2>Where can I view Unifey's source code?</h2>
                    <p>
                        You can view Unifey's source code on our{" "}
                        <ExternalLink link="https://github.com/unifey-net">
                            GitHub
                        </ExternalLink>
                        . This contains our frontend as well as our backend's
                        code.
                    </p>
                </div>

                <div>
                    <h2>Can I contribute to Unifey's source code?</h2>
                    <p>
                        We're currently not looking for outside contributors.
                        However, we're always looking for suggestions in our{" "}
                        <ExternalLink link="https://unifey.net/discord">
                            Discord
                        </ExternalLink>
                        !
                    </p>
                </div>

                <div>
                    <h2>
                        If I have an issue or need help where can I find help?
                    </h2>
                    <p>
                        You can view Unifey's source code on our{" "}
                        <ExternalLink link="https://github.com/unifey-net">
                            GitHub
                        </ExternalLink>
                        . This contains our frontend as well as our backend's
                        code.
                    </p>
                </div>
            </div>
        </AboutStyle>
    )
}

export default {
    exact: true,
    path: "/about",
    component: About,
}
