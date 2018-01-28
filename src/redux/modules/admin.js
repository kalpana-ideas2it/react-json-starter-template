const LOAD = 'redux-example/admin/LOAD';
const LOAD_SUCCESS = 'redux-example/admin/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/admin/LOAD_FAIL';

const initialState = {
  loaded: false,
  messages: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        [action.stateName]: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function loadViewData(api, stateName, filters) {
  console.log(filters);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get(api, { params: filters }),
    stateName
  };
}
