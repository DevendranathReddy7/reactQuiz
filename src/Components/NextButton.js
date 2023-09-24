const NextButton = ({ dispatch, answer, index, noOfQuest }) => {
    if (answer === null) return null
    if (index < noOfQuest - 1) {
        return (
            <div>
                <button className="btn btn-ui" onClick={() => { dispatch({ type: 'nextQuestion' }) }}>Next</button>
            </div>
        )
    }
    if (index === noOfQuest - 1) {
        return (
            <div>
                <button className="btn btn-ui" onClick={() => { dispatch({ type: 'finished' }) }}>Finish</button>
            </div>
        )
    }

}
export default NextButton