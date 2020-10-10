import React from "react"

type Props = {
    question: string
    answer: JSX.Element
}

export default ({ question, answer }: Props) => {
    return (
        <div>
            <h1 className="text-lg">{question}</h1>
            {answer}
        </div>
    )
}
