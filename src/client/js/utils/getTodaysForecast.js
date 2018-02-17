import moment from "moment";

const getPartOfDay = (hour) => {
    // Consider morning to be 03 -> 06, day to be 09 -> 12, evening to be 15 -> 18, night to be 21 -> 00
    const legend = {
        0: 'night',
        3: 'morning',
        6: 'morning',
        9: 'day',
        12: 'day',
        15: 'evening',
        18: 'evening',
        21: 'night',
    };

    return legend[parseInt(hour, 10)];
};

const getTodaysForecast = (rawData) => {
    const forecast = {
        morning: null,
        day: null,
        evening: null,
        night: null,
    };

    // Step 1: Find the relevant datapoins (from times that are still to come today)
    const relevantDatapoints = rawData.filter(dataPoint =>
        moment.unix(dataPoint.dt).utc().format('DD') === moment().utc().format('DD'));

    // Step 2: Match the datapoints to subjectiv 'parts of day'
    relevantDatapoints.forEach((dp) => {
        const pod = getPartOfDay(moment.unix(dp.dt).utc().format('H')); // part of day
        if (!forecast[pod]) {
            forecast[pod] = dp.main.temp;
        } else { // If I get 2 datapoints for one part of day, take the average
            // Average the 2 datapoints together
            forecast[pod] = (forecast[pod] + dp.main.temp) / 2;
        }
    });

    return forecast;
};

export default getTodaysForecast;
