import React, { useEffect, useState } from "react";
import './Catalog.css';

const Catalog = () => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json')
        .then(response => response.json())
        .then(data => setData(data.Results))
        .catch(err => console.log(err))
    }, []);

    return(
        <>
        
        </>
    )
};

export default Catalog;