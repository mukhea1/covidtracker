import React, { useEffect, useState } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { fetchCountries } from '../api';
import '../src/styles/App.scss';

function CountryPicker() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");

    const getCountriesByName = async () => {
        const response = await fetchCountries();
        setCountries(response);
    };

    useEffect(() => {
        getCountriesByName();
    }, []);

    const onCountryChange = (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
    }


    return (
        <div>
            <FormControl className="app__dropdown">
                <Select variant="outlined" value={country} onChange={onCountryChange}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>

                    {countries.map((cntry, index) => (
                        <MenuItem key={index} value={cntry.value}>{cntry.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default CountryPicker
