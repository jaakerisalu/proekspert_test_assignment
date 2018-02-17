import moment from "moment";

const getFiveDayForecast = (rawData) => {
    // Step 1: Find the relevant datapoins (from times that are NOT from today)
    const relevantDatapoints = rawData.filter(
        dataPoint => moment.unix(dataPoint.dt).utc().format('DD') !== moment().utc().format('DD'));

    const data = {};
    // Step 2: Group the datapoints by day, average out the temperature, pick an icon somehow I guess?
    relevantDatapoints.forEach((dp) => {
        // Since we have < week of data I can just use the day as key, no conflicts
        const dayOfWeek = moment.unix(dp.dt).utc().format('dddd');
        if (!data[dayOfWeek]) {
            data[dayOfWeek] = { temp: [dp.main.temp], weatherId: dp.weather[0].id };  // WeatherId used for icon
        } else {  // If I get more datapoints for a day, average the temperatures
            // Try to get a weatherId as close to 15:00 as possible as what I consider a good baseline
            data[dayOfWeek].temp.push(dp.main.temp);

            // Datapoints are sorted by time, so it's always 3 o clock -> 6 o clock -> 9 o clock etc
            if (parseInt(moment.unix(dp.dt).utc().format('H'), 10) <= 15) {
                // Overwrite the old one since this comes later in the day, but not after 3 PM
                data[dayOfWeek].weatherId = dp.weather[0].id;
            }
        }
    });

    return data;
};

export default getFiveDayForecast;
