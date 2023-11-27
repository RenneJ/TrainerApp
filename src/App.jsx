import './App.css';
import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingList'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
    const [value, setValue] = useState('Trainings');
    const handleChange = (_, value) => {
      setValue(value);
    };
      
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <Tabs value={value} onChange={handleChange}>
              <Tab value="Trainings" label="Trainings" />
              <Tab value="Customers" label="Customers" />
          </Tabs>
          {value === 'Customers' && <div><CustomerList /></div>}
          {value === 'Trainings' && <div><TrainingList /></div>}
      
        </div>
      </LocalizationProvider>
    )
}

export default App
