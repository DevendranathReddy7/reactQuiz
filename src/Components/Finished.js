const Finished = ({ points, totalPoints, highScore, dispatch, questionsSkipped, correctlyAnswered, inCorrectlyAnswered }) => {
    const percentage = (points / totalPoints) * 100
    return (
        <div>
            <h3>Quiz Summary</h3>

            <p className="result">Total Questions: {correctlyAnswered + inCorrectlyAnswered + questionsSkipped}</p>
            <p className="result">Questions Answered Correctly: {correctlyAnswered}</p>
            <p className="result">Questions Answered Incorrectly: {inCorrectlyAnswered}</p>
            <p className="result">Total Questions Skipped: {questionsSkipped}</p>
            <p className="result">You scored <strong>{points}</strong> out of {totalPoints} points. i.e., {Math.ceil(percentage)}%</p>
            <p>HigestScore: {<strong>{highScore}</strong>}</p>

            <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>
                Re-start
            </button>
        </div>

    )
}
export default Finished