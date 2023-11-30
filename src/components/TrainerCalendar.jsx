import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

export default function TrainerCalendar() {
    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);
    
    var calendarEventArray = [];
    var calendarEventObject = {};
    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    function makeEventArray(training) {
        calendarEventObject = {
            start: moment(training.date).toDate(),
            end: moment(training.date).add(training.duration, "m").toDate(),
            title: `${training.customer?.firstname} ${training.customer?.lastname}(${training.activity})`
        }
        calendarEventArray.push(calendarEventObject)
        if (calendarEventArray.length == trainings.length){
            setEvents(event => [...event, ...calendarEventArray])
        }
    };
    useEffect(() => trainings.forEach((training) => makeEventArray(training)), [trainings]);
    
    return(
        <Calendar localizer={localizer} events={events} />
    );
}