import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import { Input, Button } from 'antd'
import { DataStore } from '@aws-amplify/datastore'
import { Message} from './models'

const initialState = { color: '#000000', title: '', }

function App() {
  const [formState, updateFormState] = useState(initialState)
  const [messages, updateMessages] = useState([])
  const [showPicker, updateShowPicker] = useState(false)

  useEffect(() => { 
    fetchMessages()
    const subscription = DataStore.observe(Message).subscribe(() => fetchMessages())
    return () => subscription.unsubscribe()
  })

  function onChange(e) {
    if (e.hex) {
      updateFormState({ ...formState, color: e.hex })
    } else { updateFormState({ ...formState, title: e.target.value }) }
  }
  
  async function fetchMessages() {
    const messages = await DataStore.query(Message)
    updateMessages(messages)
  }
  async function createMessage() {
    if (!formState.title) return
    await DataStore.save(new Message({ ...formState }))
    updateFormState(initialState)
  }

    return (
      <div style={container}>
        <h1 style={heading}>Real Time Message Board</h1>
        <Input
          onChange={onChange}
          name='title'
          placeholder='Message title'
          value={formState.title}
          style={input}
        />
        <div>
          <Button onClick={() => updateShowPicker(!showPicker)}style={button}>Toggle Color Picker</Button>
          <p>Color: <span style={{fontWeight: 'bold', color: formState.color}}>{formState.color}</span></p>
        </div>
        {
          showPicker && <SketchPicker color={formState.color} onChange={onChange} />
        }
        <Button type='primary' onClick={createMessage}>Create Message</Button>
        {
          messages.map(message => (
            <div key={message.id} style={{...messageStyle, backgroundColor: message.color}}>
              <div style={messageBg}>
                <p style={messageTitle}>{message.title}</p>
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