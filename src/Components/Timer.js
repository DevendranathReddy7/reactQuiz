import { useEffect } from "react"

const Timer = ({ dispatch, timeRemainig }) => {
    const mint = Math.floor(timeRemainig / 60)
    const sec = timeRemainig % 60
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'tick' })
        }, [1000])
        return () => clearInterval(id)
    }, [dispatch])
    return (

        <div className="timer" >{mint < 10 && "0"}{mint}:{sec < 10 && "0"}{sec}</div>
    )
}
export default Timer