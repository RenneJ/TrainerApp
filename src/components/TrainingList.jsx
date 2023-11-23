import {useState, useEffect, forwardRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import dayjs from 'dayjs';
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
            headerName: 'Name',
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

    function dateFormatter(trainings) {
        return(
            dayjs(trainings.data.date).format('DD/MM/YYYY hh:ss')
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

    return(
        <div className='ag-theme-material' style={{width: '800px', height: '700px', margin: 'auto', padding: '20px 0'}}>
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