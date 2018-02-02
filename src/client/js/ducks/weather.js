const initialState = {
    isLoading: true,
    error: null,
    weatherData: [],
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
        default:
            return state;
    }
};

// action creators
const setError = (statusCode, message) => ({ type: 'SET_ERROR', statusCode, message });
const setLoading = status => ({ type: 'SET_LOADING', status });
const setData = data => ({ type: 'SET_DATA', data });

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
