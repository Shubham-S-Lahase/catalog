import React, { useEffect, useState } from "react";
import './Catalog.css';
import axios from "axios";

const Catalog = () => {
    const [manufacturers,setManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);

    useEffect(() => {
        axios
        .get(
            "https://vpic.nhtsa.dot.gov/api//vehicles/getallmanufacturers?format=json"
        )
        .then((response) => {
            setManufacturers(response.data.Results);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const handleRowClick = (manufacturer) => {
        axios
        .get(
            `https://vpic.nhtsa.dot.gov/api//vehicles/GetManufacturerDetails/${manufacturer.Mfr_ID}?format=json`
        )
        .then((response) => {
            setSelectedManufacturer(response.data.Results[0]);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    console.log(manufacturers);
    
    return(
      <div className="container">
        <h1>VEHICLE MANUFACTURERS</h1>
        <div className="srcfilter">
            <div>
                <span>Search</span>
                <input type="search"/>
            </div>
            <div>
                <span>Filter By Vehicle Type</span>
                <select>
                    <option>All</option>
                    <option>Passenger Car</option>
                    <option>Truck</option>
                    <option>Multipurpose Passenger Vehicle(MPV)</option>
                    <option>Motorcycle</option>
                    <option>Trailer</option>
                    <option>Low Speed Vehicle(LSV)</option>
                    <option>Off Road Vehicle</option>
                    <option>Bus</option>
                    <option>Incomplete Vehicle</option>
                </select>
            </div>
        </div>
        <div className="tablecont">
          <table border="1px solid black" cellPadding="5px" cellSpacing="0">
           <thead>
           <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Type</th>
            </tr>
           </thead>
           <tbody>
            {manufacturers.map((manufacturer) => (
                <tr key={manufacturer.Mfr_ID} onClick={() => handleRowClick(manufacturer)}>
                    <td>{manufacturer.Mfr_CommonName}</td>
                    <td>{manufacturer.Country}</td>
                    {/* <td>{manufacturer.VehicleTypes[0].Name}</td> */}
                    <td></td>
                </tr>
            ))}
           </tbody>
          </table>
          {selectedManufacturer && (
            <div>
                <h2>{selectedManufacturer.Mfr_Name}</h2>
                <p>Registration Name: {selectedManufacturer.Mfr_CommonName}</p>
                <p>Address: {selectedManufacturer.Address}</p>
                <p>Head: {selectedManufacturer.ContactLastNAme}, {selectedManufacturer.ContactFirstName}</p>
            </div>
          )}
        </div>
      </div>
    )
};

export default Catalog;


















































































































































































































































































