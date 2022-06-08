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

    div {
        max-width: 520px;
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
                        <ExternalLink link="https://discord.gg/QMVA8FWNbc">
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
                        If you need assistance with anything Unifey related, you
                        can always send a message in the{" "}
                        <ExternalLink link="https://discord.gg/QMVA8FWNbc">
                            Discord
                        </ExternalLink>
                        . For more serious inquieries, you can email AJ at{" "}
                        <ExternalLink link="mailto:aj@ajkneisl.dev">
                            aj@ajkneisl.dev
                        </ExternalLink>
                        .
                    </p>
                </div>
            </div>
        </AboutStyle>
    )
}

export default About
