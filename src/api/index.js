import axios from "axios";

const countriesUrl = "https://disease.sh/v3/covid-19/countries";
const worldwideUrl = "https://disease.sh/v3/covid-19/all";

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(countriesUrl);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchCovidInfo = async (countryCode) => {
    try {
        const url = countryCode === 'worldwide' ? worldwideUrl : countriesUrl + `/${countryCode}`
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        console.error(error);
    }
}

export const fetchHistoricalData = async () => {
    try {
        // If needed pull out the no of days - for now it is 120 days
        const {data} = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=140')
        return data;
    } catch(error) {
        console.error(error)
    }
}