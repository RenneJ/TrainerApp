import Button from '@mui/material/Button';

export default function CustomersCSV(props) {
    
    const createCSV = () => {
        const csvString = [
            ...props.customers.map(customer => [
                customer.lastname,
                customer.firstname,
                customer.streetaddress,
                customer.postcode,
                customer.city,
                customer.email,
                customer.phone
            ])
        ]
        .map(datum => datum.join(",")) 
        .join("\n");
        return(csvString)
    };

    function downloadCSV(){
        let file = createCSV(props.customers);
        let filename = 'trainer_app_customers.csv';
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(file));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return(
        <div>
            <Button variant="contained" onClick={downloadCSV}>Download as CSV</Button>
        </div>
    )
}