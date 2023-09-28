import Header from "./Components/Header"
import './index.css'
import Main from "./Components/Main"
import { useEffect, useReducer } from "react"
import Loader from "./Components/Loader"
import Error from "./Components/Error"
import StartScreen from "./Components/StartScreen"
import Questions from "./Components/Questions"
import NextButton from "./Components/NextButton"
import Progressbar from "./Components/Progressbar"
import Finished from "./Components/Finished"
import Timer from "./Components/Timer"
const intitalState = {
  questions: [],
  status: "loading", //loading,error,active,ready,finished
  index: 0,
  answer: null,
  points: 0, highScore: 0,
  timeRemaining: null,
  questionsSkipped: 0,
  correctlyAnswered: 0,
  inCorrectlyAnswered: 0

}

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataRecived':
      return {
        ...state, questions: action.payload, status: 'ready'
      }
    case 'dataFailed':
      return {
        ...state, status: 'error'
      }
    case 'start':
      return {
        ...state, status: 'active', timeRemaining: state.questions.length * 30
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points,
        correctlyAnswered: action.payload === question.correctOption ? state.correctlyAnswered + 1 : state.correctlyAnswered,
        inCorrectlyAnswered: action.payload !== question.correctOption ? state.inCorrectlyAnswered + 1 : state.inCorrectlyAnswered

      }

    case 'nextQuestion':
      return {
        ...state, index: state.index + 1, answer: null
      }
    case 'skipQuestion':
      return {
        ...state, index: state.index + 1, answer: null, questionsSkipped: state.questionsSkipped + 1
      }
    case 'finished':
      return {
        ...state, status: 'finished', highScore: state.points > state.highScore ? state.points : state.highScore
      }

    case 'restart':
      return {
        ...intitalState, questions: state.questions, status: 'ready'
      }
    case 'tick':
      return {
        ...state, timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? 'finished' : state.status
      }

    default:
      throw new Error('Action not defined')
  }

}

const App = () => {
  const [{ questions, status, index, answer, points, highScore, timeRemaining, questionsSkipped, correctlyAnswered, inCorrectlyAnswered }, dispatch] = useReducer(reducer, intitalState)
  const noOfQuest = questions.length
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch('http://localhost:7000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRecived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' })
      )
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen leng={noOfQuest} dispatch={dispatch} />}
        {status === 'active' &&
          (<>
            <Progressbar index={index} point={points} totalPoints={totalPoints} noOfQuest={noOfQuest} answer={answer} />
            <Questions question={questions[index]} dispatch={dispatch} answer={answer} index={index} totalPoints={totalPoints} />
          </>)}
        {status === 'finished' && <Finished points={points} totalPoints={totalPoints} highScore={highScore} dispatch={dispatch} questionsSkipped={questionsSkipped} correctlyAnswered={correctlyAnswered} inCorrectlyAnswered={inCorrectlyAnswered} />}
        {status === 'active' && <Timer dispatch={dispatch} timeRemainig={timeRemaining} />}
        {status === 'active' && < NextButton dispatch={dispatch} answer={answer} index={index} noOfQuest={noOfQuest} />}
      </Main>
    </div>
  )
}
export default App
