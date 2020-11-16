import logo from '../src/assets/logo.png';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import '../src/styles/App.scss';
import { fetchCountries, fetchCovidInfo } from './api';
import { InfoBox, Map, Table, LineChart } from './components';
import "leaflet/dist/leaflet.css";

function App() {
  // state is something like a short term memory
  // STATE is how to write a variable in react
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases")
  // USEEFFECT runs a piece of code based on a given condition. Condition is specified in the square brackets []

  // useEffect(() => {
  //  THe code inside here will run once when the component loads and not again
  // }, [])

  // useEffect(() => {
  //  THe code inside here will run once when the component loads and again when the countries variable changes
  // }, [countries])

  const getCountries = async () => {
    // Set Countries in the dropdown
    const response = await fetchCountries();

    setCountries(response.map((c) => ({ name: c.country, value: c.countryInfo.iso2 })));

    // Set the data for table
    setTableData(response);

    // Set the data for Map
    setMapCountries(response);

  };

  useEffect(() => {
    getCountries();
    // load the component with worldwide
    getGlobalCovidInfo();
  }, []);


  const getGlobalCovidInfo = async () => {
    const response = await fetchCovidInfo('worldwide');
    // console.log(`getting worldwide covid info `)
    setCountryInfo(response);
    // console.log(`worldwide covid info is ${JSON.stringify(response)}`)
  }

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log(`changing countryCode ${countryCode}`)
    setCountry(countryCode);
    await fetchCovidInfo(countryCode).then((response) => {
      // console.log(`getting covid info for ${countryCode}`)
      setCountryInfo(response);
      console.log(`response is ${JSON.stringify(response)}`)
      // console.log(` countryInfo is ${JSON.stringify(response.countryInfo)}`);
      if (countryCode !== 'worldwide') {
        console.log(`${response.countryInfo.iso3}, ${response.countryInfo.lat}, ${response.countryInfo.long}`);
        setMapCenter({ lat: response.countryInfo.lat, lng: response.countryInfo.long });
        setMapZoom(4);
      } else {
        setMapCenter({ lat: 34.80746, lng: -40.4796 });
        console.log(`setting worldwide map center and zoom ${JSON.stringify(mapCenter)}`)
        setMapZoom(3);
      }
    });

  }

  
  return (
    <div className="app"> {/* BEM naming convention */}
      <div className="app__left">
        {/* Header */}
        {/* Title + Select input dropdown field */}
        <div className="app__header">
          {/* <h1 >ASHISH'S COVID TRACKER <img src={logo} className="App-logo" alt="logo" /></h1> */}
          <h1 >ASHISH'S COVID TRACKER </h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((cntry, index) => (
                <MenuItem key={index} value={cntry.value}>{cntry.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox onClick={(e) => setCasesType("cases")}
            title="Cases"
            isRed
            active={casesType === "cases"} 
            total={countryInfo.cases} 
            cases={countryInfo.todayCases}></InfoBox>
          <InfoBox onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"} 
            total={countryInfo.recovered} 
            cases={countryInfo.todayRecovered}></InfoBox>
          <InfoBox onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
             total={countryInfo.deaths} 
             cases={countryInfo.todayDeaths}></InfoBox>
        </div>

        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
          <div className="app__information">
            <h3> Live Cases by Country</h3>
            <Table countries={tableData}></Table>
            <h3>Worldwide new cases </h3>
            {/* Table */}
            {/* Graph */}
            <LineChart casesType={casesType} />
            </div>
          </CardContent>
        </Card>


      </div>


    </div>
  );
}

export default App;