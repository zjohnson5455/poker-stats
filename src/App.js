import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import { DataStore } from '@aws-amplify/datastore'
import { Player, Game} from './models'

function App() {
  const [gameFormState, updateGameFormState] = useState({date: ""})
  const [games, updateGames] = useState([])
  const [playerFormState, updatePlayerFormState] = useState({name: ""})
  const [players, updatePlayers] = useState([])
  // const [handFormState, updateHandFormState] = useState([])
  // const [hands, updateHands] = useState([])

  useEffect(() => { 
    fetchGames()
    const subscriptionGames = DataStore.observe(Game).subscribe(() => fetchGames())
    fetchPlayers()
    const subscriptionPlayers = DataStore.observe(Player).subscribe(() => fetchPlayers())
    // fetchHands()
    // const subscriptionHands = DataStore.observe(Hand).subscribe(() => fetchHands())
    return function cleanup() {
      subscriptionGames.unsubscribe()
      subscriptionPlayers.unsubscribe()
      // subscriptionHands.unsubscribe()
    }
  })

  function onGameChange(e) {
    updateGameFormState({ ...gameFormState, date: e.target.value})
  }

  function onPlayerChange(e) {
    updatePlayerFormState({ ...playerFormState, name: e.target.value})
  }

  
  async function fetchGames() {
    const games = await DataStore.query(Game)
    updateGames(games)
  }

  async function fetchPlayers() {
    const players = await DataStore.query(Player)
    updatePlayers(players)
  }


  async function createGame() {
    if (!gameFormState.date) return
    await DataStore.save(new Game({ ...gameFormState }))
    updateGameFormState({date: ""})
  }

  async function createPlayer() {
    if (!playerFormState.date) return
    await DataStore.save(new Player({ ...playerFormState }))
    updatePlayerFormState({name: ""})
  }

    return (
      <div style={container}>
        <h1 style={heading}>Games and Players</h1>
        <Input
          onChange={onGameChange}
          name='Game'
          placeholder='Game date'
          value={gameFormState.date}
          style={input}
        />
        <Button type='primary' onClick={createGame}>Create Game</Button>
        {
          games.map(game => (
            <div key={game.id} style={{...messageStyle, backgroundColor: '#000000'}}>
              <div style={messageBg}>
                <p style={messageTitle}>{game.date}</p>
              </div>
            </div>
          ))
        }
        <p>-------------</p>
        <Input
          onChange={onPlayerChange}
          name='Player'
          placeholder='Player name'
          value={playerFormState.date}
          style={input}
        />
        <Button type='primary' onClick={createPlayer}>Create Player</Button>
        {
          players.map(player => (
            <div key={player.id} style={{...messageStyle, backgroundColor: '#000000'}}>
              <div style={messageBg}>
                <p style={messageTitle}>{player.name}</p>
              </div>
            </div>
          ))
        }
      </div>
    )
}

const container = { width: '100%', padding: 40, maxWidth: 900 }
const input = { marginBottom: 10 }
const button = { marginBottom: 10 }
const heading = { fontWeight: 'normal', fontSize: 40 }
const messageBg = { backgroundColor: 'white' }
const messageStyle = { padding: '20px', marginTop: 7, borderRadius: 4 }
const messageTitle = { margin: 0, padding: 9, fontSize: 20  }

export default App

/*  dependencies from package.json
 "dependencies": {
    "@aws-amplify/core": "^2.2.5",
    "@aws-amplify/datastore": "^1.0.8",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "antd": "^4.0.3",
    "react": "^16.13.0",
    "react-color": "^2.18.0",
    "react-dom": "^16.13.0",
    "react-scripts": "3.4.0"
  },
*/

/* imports from index.js
import 'antd/dist/antd.css'
import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)
*/

/* GraphQL Schema
type Message @model {
  id: ID!
  title: String!
  color: String
  image: String
  createdAt: String
}
*/