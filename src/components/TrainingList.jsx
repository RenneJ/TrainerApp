import {useState, useEffect, forwardRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Date',
            field: 'date',
            sortable: true,
            filter: 'agDateColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Duration',
            field: 'duration',
            sortable: true,
            filter: 'agNumberColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Activity',
            field: 'activity',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        }
    ]);
    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    };

    return(
        <div className='ag-theme-material' style={{width: '1400px', height: '700px', margin: 'auto', padding: '20px 0'}}>
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={trainings}
                animateRows="true"
                pagination="true"
                paginationAutoPageSize="true"
            />
        </div>
    )
}