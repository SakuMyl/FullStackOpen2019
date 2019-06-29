import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router basename='/#'>
                <App/>
            </Router>
        </Provider>,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)