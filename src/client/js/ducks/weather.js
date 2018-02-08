/* global google */

const initialState = {
    isLoading: true,
    error: null,
    weatherData: [],
    measurementSystem: 'f',
    location: {
        lat: '',
        lon: '',
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
            return [action.statusCode, action.message];
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
        case 'SET_COORDS':
            return {
                ...state,
                location: {
                    lat: action.lat,
                    lon: action.lon,
                    city: '#TODO',
                },
            };
        default:
            return state;
    }
};

// action creators
const setError = (statusCode, message) => ({ type: 'SET_ERROR', statusCode, message });
const setLoading = status => ({ type: 'SET_LOADING', status });
const setData = data => ({ type: 'SET_DATA', data });
export const setMeasurementSystem = system => ({ type: 'SET_SYSTEM', system });
export const setCoordinates = (lat, lon) => ({ type: 'SET_COORDS', lat, lon });

// export const setCoordinatesWithCity(lat, lon) {
//   return function (dispatch) {
//     return fetchcity().then(
//       coords => dispatch(setCoordinates(coords)),
//       error => dispatch(() => {});
//     );
//   };
// }

export const fetchWeatherData = () => (dispatch) => {
    dispatch(setLoading(true));

    try {
        fetch('http://www.APIurlGOEShere.com/api/things')
            .then(res => res.json())
            .then(
                (jsonResult) => {
                    dispatch(setData(jsonResult.data));
                    dispatch(setLoading(false));
                },
            );
    } catch (err) {
        console.log(err);
        dispatch(setLoading(false));
        dispatch(setError(err.statusCode, 'Failed fetch'));
    }
};

export default weatherReducer;
