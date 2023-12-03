import "./App.css";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TrainerCalendar from "./components/TrainerCalendar";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import ActivityChart from "./components/ActivityChart";


function App() {
    const [value, setValue] = useState("Trainings");
    const handleChange = (_, value) => { setValue(value) };
      
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="Trainings" label="Trainings" />
                <Tab value="Customers" label="Customers" />
                <Tab value="Calendar" label="Calendar" />
                <Tab value="Chart" label="Chart" />
            </Tabs>
            {value === "Customers" && <div><CustomerList /></div>}
            {value === "Trainings" && <div><TrainingList /></div>}
            {value === "Calendar" && <div style={ { height: "85vh" } }><TrainerCalendar /></div>}
            {value === "Chart" && <div><ActivityChart /></div>}
        </div>
    </LocalizationProvider>
    )
}

export default App
