import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ActivityChart() {
    const [trainings, setTrainings] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(()=> fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    // TODO: metodi jolla tehdään uusi lista johon on yhteen laskettu duration per activity; siitä diagrammi

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={trainings} margin={{top: 50}}>
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
      );
}