/* global google */

const OPEN_WEATHER_MAP_API_KEY = '51f38e774e8c2d2ddb78eed08bffdefa';  // Wouldn't do this in prod

const initialState = {
    isLoading: true,
    error: null,
    weatherData: [],
    measurementSystem: 'f',
    location: {
        lat: 0,
        lon: 0,
        city: "",
    },
};

const getCity = (latitude, longitude) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(latitude, longitude);

    return new Promise((resolve) => {
        geocoder.geocode(
            { latLng: latlng },
            (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        resolve(results[0].address_components[2].short_name);
                    }

                    resolve('Chosen location'); // I mean, it's technically correct
                }

                resolve('Chosen location');
            },
        );
    });

};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                weatherData: action.data,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: [action.statusCode, action.message],
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.status,
            };
        case 'SET_SYSTEM':
            return {
                ...state,
                measurementSystem: action.system,
            };
        case 'SET_COORDS': {
            const { lat, lon, city } = action;
            return {
                ...state,
                location: {
                    lat,
                    lon,
                    city,
                },
            };
        }
        default:
            return state;
    }
};

// action creators
const setError = (statusCode, message) => ({ type: 'SET_ERROR', statusCode, message });
const setLoading = status => ({ type: 'SET_LOADING', status });
const setData = data => ({ type: 'SET_DATA', data });
export const setMeasurementSystem = system => ({ type: 'SET_SYSTEM', system });
export const setCoordinates = (lat, lon, city) => ({ type: 'SET_COORDS', lat, lon, city });

export const setCoordinatesWithCity = (lat, lon) => {
    return function (dispatch) {
        dispatch(setLoading(true));
        return getCity(lat, lon).then(
            (cityName) => {
                dispatch(setCoordinates(lat, lon, cityName));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setError(error.statusCode, 'Failed to get city name'));
                dispatch(setLoading(false));
            },
        );
    };
};

export const fetchWeatherData = (lat, lon) => {
    return function (dispatch) {
        dispatch(setLoading(true));
        try {
            const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast' +
                `?lat=${lat}&lon=${lon}&APPID=${OPEN_WEATHER_MAP_API_KEY}&units=metric`;
            fetch(apiUrl)
                .then(res => res.json())
                .then(
                    (jsonResult) => {
                        dispatch(setData(jsonResult.list));
                        dispatch(setLoading(false));
                    },
                );
        } catch (err) {
            dispatch(setLoading(false));
            dispatch(setError(err.statusCode, 'Failed to fetch weather data'));
        }
    };

};

export default weatherReducer;
