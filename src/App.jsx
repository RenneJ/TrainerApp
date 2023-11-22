import { useState } from 'react'
import './App.css'
import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingList'

function App() {
    const [count, setCount] = useState(0)

    return (
    <>
        <div className='App'>
           { <CustomerList /> }
            <TrainingList />
        </div>
    </>
    )
}

export default App
