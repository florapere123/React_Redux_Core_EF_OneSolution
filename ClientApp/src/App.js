import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import ItemsContainer from './containers/ItemsContainer'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <ItemsContainer />

            </div>
        </Provider>
    )
}

export default App
