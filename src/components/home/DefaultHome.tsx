import React from "react"
import styled from "styled-components"
import { desktopMedia, media } from "../../api/util/Media"

const Home = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    ${media("transform: scale(0.5);", "transform: scale(0.75);", "transform: scale(1.0);")}
  }

  .questions {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    
    ${media("", "flex-direction: row;", "flex-direction: row;")}
    
    div {
      max-width: 150px;
      padding-left: 16px;
      padding-right: 16px;
    }

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
                <img src="/homepage.png" alt="Large Unifey Logo" />
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
