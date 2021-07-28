import React from "react"
import styled from "styled-components"
import ExternalLink from "../../components/ExternalLink"
import Question from "../../components/Question"

const AboutStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

/**
 * The /about page.
 */
const About = () => {
    return (
        <AboutStyle>
            <div>
                <h1>About Unifey</h1>

                <Question
                    question="What is Unifey?"
                    answer={
                        <p>
                            Unifey is an open-source social media platform
                            dedicated to free speech and privacy.
                            <br />
                            We're currently running on a React Redux frontend
                            with a Ktor Kotlin backend.
                        </p>
                    }
                />

                <Question
                    question="Where can I view Unifey's source code?"
                    answer={
                        <p>
                            You can view Unifey's source code on our{" "}
                            <ExternalLink link="https://github.com/unifey-net">
                                GitHub
                            </ExternalLink>
                            . This contains our frontend as well as our
                            backend's code.
                        </p>
                    }
                />

                <Question
                    question="Can I contribute to Unifey's source code?"
                    answer={
                        <p>
                            We're currently not looking for outside
                            contributors. However, we're always looking for
                            suggestions in our{" "}
                            <ExternalLink link="https://unifey.net/discord">
                                Discord
                            </ExternalLink>
                            !
                        </p>
                    }
                />

                <Question
                    question="If I have an issue or need help where can I find help?"
                    answer={
                        <p>
                            We'll quickly respond to your question on our{" "}
                            <ExternalLink link="https://unifey.net/discord">
                                Discord
                            </ExternalLink>{" "}
                            server.
                        </p>
                    }
                />
            </div>
        </AboutStyle>
    )
}

export default {
    exact: true,
    path: "/about",
    component: About,
}
