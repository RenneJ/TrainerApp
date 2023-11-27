import {useState, useEffect, forwardRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import TrainingAddForm from './TrainingAddForm';

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
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
        },
        {
            headerName: 'Customer',
            colId: 'lastname&firstname',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            valueGetter: fullNameGetter
        }
    ]);

    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    useEffect(()=> fetchCustomers(), []);

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
        //console.log(trainings.data);
        // Tämä ehtolauseke korjaa virheen kun tietokannasta haetaan trainings rivi, jonka customer attribuutti on null
        // TODO: muista päiväkirjaan tämän virheen jäljitys (joku lisäs tietokantaa trainingsrivejä ilman asiakastietoja)
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
        .then(response => fetchData())
        .catch(err => console.error(err))
        //handleSnackOpen(action);
    };
    //console.log(customers)
    return(
        <div className='ag-theme-material' style={{width: '800px', height: '700px', margin: 'auto', padding: '20px 0'}}>
            <TrainingAddForm customers={customers} saveTraining={saveTraining}/>
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