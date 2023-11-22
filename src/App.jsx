import './App.css';
import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingList'

function App() {
    const [value, setValue] = useState('Trainings');
    const handleChange = (_, value) => {
      setValue(value);
    };
      
  return (
      <div>
        <Tabs value={value} onChange={handleChange}>
            <Tab value="Trainings" label="Trainings" />
            <Tab value="Customers" label="Customers" />
        </Tabs>
        {value === 'Customers' && <div><CustomerList /></div>}
        {value === 'Trainings' && <div><TrainingList /></div>}
    
      </div>
    )
}

export default App
