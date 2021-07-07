import React from "react"

type Props = {
    question: string
    answer: JSX.Element
}

/**
 * A question for the /about page.
 */
const Question: React.FC<Props> = ({ question, answer }) => {
    return (
        <div>
            <h2 className="text-lg">{question}</h2>
            {answer}
        </div>
    )
}

export default Question
