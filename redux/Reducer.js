/* eslint-disable import/no-unresolved */
import { MAKE_REQUEST, FAIL_REQUEST, GET_CATEGORY_LIST, GET_CATEGORY_NI_ITEMS } from './ActionTypes'
// import { FAIL_REQUEST, GET_USER_LIST, MAKE_REQUEST ,DELETE_USER,ADD_USER, UPDATE_USER,GET_USER_OBJ} from "./ActionTypes";

const initialstate = {
    loading: true,
    Categorylist: [],
    Categoryniitems:[],
    categoryfirstname: [],
    errormessage: '',
}

console.log(initialstate,'initialstate')

const Reducer = (state = initialstate, action) => {
    switch (action.type) {
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FAIL_REQUEST:
            return {
                ...state,
                loading: false,
                errormessage: action.payload,
            }
        case GET_CATEGORY_LIST:
            return {
                loading: false,
                errormessage: '',
                Categorylist: action.payload,
            }
        case GET_CATEGORY_NI_ITEMS:
            return {
                loading: false,
                errormessage: '',
                Categoryniitems: action.payload.data,
            }
        // case GET_USER_OBJ:
        //     return {
        //         ...state,
        //         loading: false,
        //         userobj:action.payload,
        //     }
        default: return state;
    }
}

export default Reducer