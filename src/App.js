import {Component} from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import {RiCloseLine} from 'react-icons/ri'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    gameOver: false,
    playerSelectedImg: '',
    opponentSelectedImg: '',
    showRules: '',
    status: '',
  }

  componentDidMount() {}

  onSubmit = id => {
    const oppoNum = Math.floor(Math.random() * 3)
    const opponentSelected = choicesList[oppoNum].id
    this.setState({
      opponentSelectedImg: choicesList[oppoNum].imageUrl,
      playerSelectedImg: choicesList.filter(item => item.id === id)[0].imageUrl,
    })
    if (id === opponentSelected) {
      this.setState({status: 'IT IS DRAW', gameOver: true})
    } else if (
      (id === 'ROCK' && opponentSelected === 'SCISSORS') ||
      (id === 'SCISSORS' && opponentSelected === 'PAPER') ||
      (id === 'PAPER' && opponentSelected === 'ROCK')
    ) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        status: 'YOU WON',
        gameOver: true,
      }))
    } else {
      this.setState(prevState => ({
        score: prevState.score - 1,
        status: 'YOU LOSE',
        gameOver: true,
      }))
    }
  }

  render() {
    const {
      score,
      gameOver,
      playerSelectedImg,
      opponentSelectedImg,
      status,
    } = this.state
    return (
      <div className="page">
        <div className="score-cont">
          <div className="score-left-box">
            <h1>ROCK PAPER SCISSORS</h1>
          </div>
          <div className="score-right-box">
            <p>Score</p>
            <p>{score}</p>
          </div>
        </div>
        <div className="game-cont">
          {gameOver === false ? (
            <div>
              <ul className="gaming-box">
                {choicesList.map(item => (
                  <li key={item.id}>
                    <button
                      data-testid={`${item.id.toLowerCase()}Button`}
                      className="card-btn"
                      type="button"
                      onClick={() => this.onSubmit(item.id)}
                    >
                      <img
                        className="card-img"
                        src={item.imageUrl}
                        alt={item.id}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="gamerOver-box">
              <div className="gameOver-img-box">
                <div>
                  <h1>You</h1>
                  <img src={playerSelectedImg} alt="your choice" />
                </div>

                <div>
                  <h1>Opponent</h1>
                  <img src={opponentSelectedImg} alt="opponent choice" />
                </div>
              </div>
              <p>{status}</p>
              <button
                type="button"
                onClick={() => {
                  this.setState({gameOver: false})
                }}
              >
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
        <div className="bottom-cont">
          <Popup
            position="center center"
            className="pop-cont"
            trigger={<button type="button">Rules</button>}
          >
            {close => (
              <div className="popup-overlay">
                <div className="popup-content">
                  <button
                    className="close-btn"
                    type="button"
                    onClick={() => close()}
                  >
                    <RiCloseLine />
                  </button>
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                      alt="rules"
                    />
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default App
