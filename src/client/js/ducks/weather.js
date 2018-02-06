const initialState = {
    isLoading: true,
    error: null,
    weatherData: [],
    measurementSystem: 'f',
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
        default:
            return state;
    }
};

// action creators
const setError = (statusCode, message) => ({ type: 'SET_ERROR', statusCode, message });
const setLoading = status => ({ type: 'SET_LOADING', status });
const setData = data => ({ type: 'SET_DATA', data });
export const setMeasurementSystem = system => ({ type: 'SET_SYSTEM', system });

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
