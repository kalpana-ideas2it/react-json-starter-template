const LOAD = 'redux-example/admin/LOAD';
const LOAD_SUCCESS = 'redux-example/admin/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/admin/LOAD_FAIL';

const UPDATE = 'redux-example/admin/UPDATE';
const UPDATE_SUCCESS = 'redux-example/admin/UPDATE_SUCCESS';
const UPDATE_FAIL = 'redux-example/admin/UPDATE_FAIL';

const CREATE = 'redux-example/admin/CREATE';
const CREATE_SUCCESS = 'redux-example/admin/CREATE_SUCCESS';
const CREATE_FAIL = 'redux-example/admin/CREATE_FAIL';

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
    case UPDATE:
      return {
        ...state,
        updating: true
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.error
      };

    case CREATE:
      return {
        ...state,
        creating: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
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

export function update(api, data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: ({ client }) => client.patch(api, data)
  };
}

export function create(api, data) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: ({ client }) => client.post(api, data)
  };
}
