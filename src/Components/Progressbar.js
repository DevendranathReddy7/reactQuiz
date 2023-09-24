const Progressbar = ({ index, point, totalPoints, noOfQuest, answer }) => {
    return (

        <header className="progress">
            <progress max={noOfQuest} value={index + Number(answer !== null)}></progress>
            <p>Question <strong>{index + 1}</strong>/{noOfQuest}</p>
            <p> {point}/<strong>{totalPoints}</strong></p>
        </header>
    )
}
export default Progressbar