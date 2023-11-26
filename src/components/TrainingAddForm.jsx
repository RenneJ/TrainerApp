import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function addTraining(props) {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [training, setTraining] = useState({
        date: '',
        duration: undefined,
        activity: '',
        customer: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }

    useEffect(()=> setCustomers(props.customers));

    return(
        <div>
            <Button style={{position: 'relative', right: '565px'}} variant="contained" onClick={handleClickOpen}>Add Training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="date"
                    value={training.date}
                    onChange={e => handleInputChange(e)}
                    label="Date"
                    type="date"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={e => handleInputChange(e)}
                    label="Duration"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={e => handleInputChange(e)}
                    label="Activity"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={training.customer}
                        name="customer"
                        label="Customer"
                        onChange={e => handleInputChange(e)}
                    >{
                        customers.map((customer) => {
                            return <MenuItem value={customer.links[0].href} key={customer.links[0].href}>{customer.lastname}, {customer.firstname}</MenuItem>
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