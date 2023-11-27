import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px',
    boxShadow: 24,
    p: 4,
};

export default function TrainingDelete(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteTraining = () => {
        var id = props.training.id;
        props.deleteTraining(id);
        handleClose();
    }

    return (
        <div>
            <Button variant="contained" size="small" color="error" onClick={handleOpen}>Delete</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirm delete
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                    Delete {props.training.activity} at {dayjs(props.training.date).format('DD/MM/YYYY HH:mm')} from the database?
                </Typography>
                    <Button size="small" onClick={handleClose}>Cancel</Button>
                    <Button size="small" variant="contained" color="error" onClick={deleteTraining}>Delete</Button>
                </Box>
            </Modal>
        </div>
    );
}