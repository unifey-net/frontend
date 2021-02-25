import React from "react"
import ExternalLink from "../../components/ExternalLink"
import Question from "./Question"

/**
 * The /about page.
 */
const About = () => {
    return (
        <div className="flex items-center justify-center">
            <div>
                <h1 className="text-4xl md:text-2xl lg:text-6xl">
                    About Unifey
                </h1>

                <Question
                    question="What is Unifey?"
                    answer={<p>
                        Unifey is an open-source social media platform dedicated to free speech and privacy.
                    </p>}
                />

                <Question
                    question="Where can I view Unifey's source code?"
                    answer={<p>
                        You can view Unifey's source code on our <ExternalLink link="https://github.com/unifey-net">GitHub</ExternalLink>. This contains our frontend as well as our backend's code.
                    </p>}
                />

                <Question
                    question="If I have an issue or need help where can I find help?"
                    answer={<p>
                        We'll quickly respond to your question on our <ExternalLink link="https://unifey.net/discord">Discord</ExternalLink> server.
                    </p>}
                />
            </div>
        </div>
    )
}

export default About;