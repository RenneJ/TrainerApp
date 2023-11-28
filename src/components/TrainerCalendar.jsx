import {useState, useEffect, prevState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

export default function TrainerCalendar() {
    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);
/*     const [event, setEvent] = useState({
        start: "",
        end: "",
        title: ""
    }); */
    
    var arrayvar = [];
    var objectvar = {};
    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    function makeEventList(training) {
        /* setEvent({
            start: moment(training.date).toDate(),
            end: moment(training.date).add(training.duration, "m").toDate(),
            title: `${training.customer?.firstname} ${training.customer?.lastname}(${training.activity})`
        }) */
        objectvar = {
            start: moment(training.date).toDate(),
            end: moment(training.date).add(training.duration, "m").toDate(),
            title: `${training.customer?.firstname} ${training.customer?.lastname}(${training.activity})`
        }
        arrayvar.push(objectvar)
        if (arrayvar.length == trainings.length){
            setEvents(events => [...events, ...arrayvar])
        }
    };
    useEffect(() => trainings.forEach((training) => makeEventList(training)), [trainings]);
    
    return(
        <Calendar localizer={localizer} events={events} />
    );
}