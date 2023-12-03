import { useState, useEffect, forwardRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TrainingAddForm from './TrainingAddForm';
import TrainingDelete from './TrainingDelete';

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);

    const deleteButton = (row) => {
        return(
            <TrainingDelete deleteTraining={deleteTraining} training={row.data}/>
        );
    };

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Date',
            field: 'date',
            sortable: true,
            filter: 'agDateColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            valueFormatter: dateFormatter
        },
        {
            headerName: 'Duration (mins)',
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
        },
        {
            headerName: 'Customer',
            colId: 'lastname&firstname',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            valueGetter: fullNameGetter
        },
        {
            width: 100,
            cellRenderer: deleteButton
        }
    ]);

    useEffect(()=> fetchTrainings(), []);
    useEffect(()=> fetchCustomers(), []);

    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

     const fetchCustomers = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => {
            setCustomers(data.content)
        })
        .catch(err => console.error(err))
    };

    function dateFormatter(trainings) {
        return(
            dayjs(trainings.data.date).format('DD/MM/YYYY HH:mm')
        )
    };

    function fullNameGetter(trainings) {
        if(trainings.data.customer === null){
            var fullName = "";
        }else {
            var fullName = trainings.data.customer.lastname + ", " + trainings.data.customer.firstname;
        }
        return(fullName)
    };

    // CRUD-metodit
    const saveTraining = (training) => {
        const action = 'Save'
        fetch('http://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => fetchTrainings())
        .then(handleSnackOpen(action))
        .catch(err => console.error(err));
    };

    const deleteTraining = (id) => {
        const action = 'Delete';
        fetch(`http://traineeapp.azurewebsites.net/api/trainings/${id}`, {method: 'DELETE'})
        .then(response => fetchTrainings())
        .then(handleSnackOpen(action))
        .catch(err => console.error(err));
    };

    // Toimintojen vahvistukset; Snackbar
    const Alert = forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');

    const handleSnackOpen = (action) => {
        setOpen(true);
        setAction(action)
    };
        
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        } setOpen(false);
    };

    return(
        <div className='ag-theme-material' style={{width: '900px', height: '700px', margin: 'auto', padding: '20px 0'}}>
            <div style={{display: 'flex', columnGap: '10px'}}>
                <TrainingAddForm customers={customers} saveTraining={saveTraining}/>
            </div>
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={trainings}
                animateRows="true"
                pagination="true"
                paginationAutoPageSize="true"
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="info" sx={{ width: '100%' }}>
                    {action} succesful!
                </Alert>
            </Snackbar>
        </div>
    )
}