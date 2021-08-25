import React from "react"
import styled from "styled-components"

const Home = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .questions {
        display: flex;
        flex-direction: row;
        gap: 2rem;

        p {
            overflow-wrap: break-word;
            max-width: 20rem;
        }
    }
`

const DefaultHome: React.FC = () => {
    return (
        <Home>
            <div>
                <img src="/homepage.png" alt="Large Unifey Logo"></img>
            </div>

            <div className="questions">
                <div>
                    <h2>What is Unifey?</h2>
                    <p>
                        Unifey is an open source social-media platform,
                        dedicated to freely exchange ideas.
                    </p>
                </div>

                <div className="learn-more">
                    <h2>How can I learn more?</h2>
                    <p>
                        You can join our
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://discord.gg/e9wKgAt"
                        >
                            {" "}
                            Discord
                        </a>
                        .
                    </p>
                </div>
            </div>
        </Home>
    )
}

export default DefaultHome
