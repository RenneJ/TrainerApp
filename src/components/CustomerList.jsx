import {useState, useEffect, forwardRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CustomerAddForm from './CustomerAddForm';
import CustomerEditForm from './CustomerEditForm';
import CustomerDelete from './CustomerDelete';
import TrainingAddForm from './TrainingAddForm';


export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const editButton = (row) => {
        return(
            <CustomerEditForm editCustomer={editCustomer} customer={row.data}/>
        );
    };

    const deleteButton = (row) => {
        return(
            <CustomerDelete deleteCustomer={deleteCustomer} customer={row.data}/>
        );
    };

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Name',
            colId: 'lastname&firstname',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            valueGetter: fullNameGetter
        },
        {
            headerName: 'Address',
            field: 'streetaddress',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Postcode',
            field: 'postcode',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            width: 110
        },
        {
            headerName: 'City',
            field: 'city',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Email',
            field: 'email',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Phone',
            field: 'phone',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            width: 150
        },
        {
            width: 90,
            cellRenderer: editButton
        },
        {
            width: 100,
            cellRenderer: deleteButton
        }
    ]);

    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => {
            setCustomers(data.content)
        })
        .catch(err => console.error(err))
    };

    // Yksi nimisarake; aakkosjärjestys sukunimen mukaan, tekstihakua voi käyttää etunimeenkin
    function fullNameGetter(customers) {
            return (customers.data.lastname + ', ' + customers.data.firstname)
        };

    // CRUD-metodit
    const saveCustomer = (customer) => {
        const action = 'Save'
        fetch('http://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
        handleSnackOpen(action);
    };
    
    const editCustomer = (customer, link) => {
        const action = 'Edit'
        fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
        handleSnackOpen(action);
    };

    const deleteCustomer = (link) => {
        const action = 'Delete';
        fetch(link, {method: 'DELETE'})
        .then(response => fetchData())
        .catch(err => console.error(err))
        handleSnackOpen(action);
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
        }
        setOpen(false);
    };

    return(
        <div className='ag-theme-material' style={{width: '1270px', height: '700px', margin: 'auto', padding: '20px 0'}}>
            <CustomerAddForm saveCustomer={saveCustomer}/>
            <AgGridReact 
                columnDefs={columnDefs}
                rowData={customers}
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