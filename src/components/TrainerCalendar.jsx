import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'


const events = [
    {
        start: moment("2023-11-28T14:00:00").toDate(),
        end: moment("2023-11-28T15:00:00").toDate(),
        title: "TEST EVENT"
    }
]

export default function TrainerCalendar() {
    const localizer = momentLocalizer(moment);
    return(
        <Calendar localizer={localizer} events={events}/>
    );
}