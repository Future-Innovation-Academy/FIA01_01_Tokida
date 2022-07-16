import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 初期起動処理、index.htmlのroot(空)を呼び出している
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* App.jsx起動 */}
    <App />
  </React.StrictMode>
)
