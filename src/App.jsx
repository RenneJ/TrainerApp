import { useState } from 'react'
import './App.css'
import CustomerList from './components/CustomerList'

function App() {
    const [count, setCount] = useState(0)

    return (
    <>
        <div className='App'>
            <CustomerList />
        </div>
    </>
    )
}

export default App
