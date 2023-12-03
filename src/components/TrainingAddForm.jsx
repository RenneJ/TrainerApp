import { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function addTraining(props) {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [training, setTraining] = useState({
        date: null,
        duration: '',
        activity: '',
        customer: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTraining({
            date: null,
            duration: '',
            activity: '',
            customer: ''
        })
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    };

    const handleDateChange = (pickedValue)=> { 
        var trainingDate = pickedValue["$d"]
        setTraining({...training, date: trainingDate})   
    };

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    };

    useEffect(()=> setCustomers(props.customers));
    
    useEffect(()=> customersByLastname());

    const customersByLastname = () =>{
        customers.sort((a, b) => (a.lastname > b.lastname) ? 1 : ((b.lastname > a.lastname) ? -1 : 0));
    };
    
    return(
        <div>
            <Button variant="contained" onClick={handleClickOpen}>Add Training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle >New Training</DialogTitle>
                <DialogContent>
                    <DateTimePicker 
                        fullWidth
                        sx={{my: 2}}
                        ampm={false}
                        label="Date"
                        name="date"
                        format="DD/MM/YYYY HH:mm"
                        value={training.date}
                        onChange={handleDateChange}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                    <TextField
                        sx={{my: 2}}
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        sx={{my: 2}}
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl fullWidth sx={{my: 2}}>
                        <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={training.customer}
                            name="customer"
                            label="Customer"
                            onChange={e => handleInputChange(e)}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 250,
                                        width: 250,
                                    },
                              }
                            }}
                        >{
                            customers.map((customer) => {
                                return(<MenuItem value={customer.links[0].href} key={customer.links[0].href}>{customer.lastname}, {customer.firstname}</MenuItem>)
                            })
                        }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div> 
    )
}