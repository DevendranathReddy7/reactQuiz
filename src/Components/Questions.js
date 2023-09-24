
const Questions = ({ question, dispatch, answer }) => {
    const hasAnswered = answer !== null
    return (

        <div>
            <div>
                <h4>{question.question}</h4>
            </div>
            <div className="options">
                {question.options.map((opt, index) =>
                    <button className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`} key={opt} disabled={hasAnswered} onClick={() => dispatch({ type: 'newAnswer', payload: index })}>{opt} </button>)}
            </div>

        </div>
    )
}
export default Questions