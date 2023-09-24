const Finished = ({ points, totalPoints, highScore, dispatch }) => {
    const percentage = (points / totalPoints) * 100
    return (
        <div>
            <p className="result">You scored <strong>{points}</strong> out of {totalPoints} points. i.e., {Math.ceil(percentage)}%</p>
            <p>HigestScore: {<strong>{highScore}</strong>}</p>

            <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>
                Re-start
            </button>
        </div>

    )
}
export default Finished