import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import _ from 'lodash';

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

    useEffect(() => groupActivities(), [trainings]);

    // groupBy returns collection; _.forEach makes it into array and formats groupedArray to have only relevant attributes, lastly setChartData for rechart
    const groupActivities = () => {
        var groupedData = _.groupBy(trainings, training => training.activity);
        var groupedArray = []
        _.forEach(groupedData, (trainingsArr, activity) => {
            var durationSum = 0
            trainingsArr.forEach((training) => durationSum += training.duration);
            groupedArray.push({'activity': activity, 'duration': durationSum});
            setChartData([...groupedArray])
        });
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{top: 50}} style={{fontFamily: 'Arial'}}>
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
      );
}