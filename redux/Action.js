/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-useless-path-segments */
// import axios from 'axios';

import API from '../api/api';
import { MAKE_REQUEST, FAIL_REQUEST, GET_CATEGORY_LIST, GET_CATEGORY_NI_ITEMS } from "./ActionTypes"

// import {toast} from 'react-toastify'

export const makeRequest = () => {
    return {
        type: MAKE_REQUEST,
    }
}

export const failRequest = (err) => {
    return {
        type: FAIL_REQUEST,
        payload: err
    }
}
export const getCategoryList = (data) => {
    return {
        type: GET_CATEGORY_LIST,
        payload: data
    }
}

export const getCategoryniItems = (data) => {
    return {
        type: GET_CATEGORY_NI_ITEMS,
        payload: data,
    }
}
// export const getCategoryItemList = (data) => {
//     return {
//         type: GET_CATEGORY_ITEM_LIST,
//         payload: data
//     }
// }

// export const deleteUser = () => {
//     return {
//         type: DELETE_USER,
//     }
// }
// export const addUser = () => {
//     return {
//         type: ADD_USER,
//     }
// }

// export const getUserObj = (data) => {
//     return {
//         type: GET_USER_OBJ,
//         payload:data,
//     }
// }


// export const FetchUserList = () => {
//     return (dispatch) => {
//         dispatch(makeRequest());
//         axios.get('http://localhost:8000/User')
//             .then(res => {
//                 const userList = res.data;
//                 dispatch(getUserList(userList));
//             }).catch(err => {
//                 dispatch(failRequest(err.message))
//             })
//     }
// }


export const fetchCategoryList = () => {
    return async (dispatch) => {
        try {
            const response = await API.get("/api/category/name");
            if (response.status === 200) {
                const firstCategoryName = response.data.CategoryName[0].cCategoryName;
                const cList = response?.data?.CategoryName;
                dispatch(getCategoryList({ firstCategoryName, cList }));
            } else {
                console.error("Failed to fetch category list");
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    }
};

export const fetchCategoryNiItem = (cSearch = 'chadda') => {
    return async (dispatch) => {
        try {
            const response = await API.get(`/api/design/CustomerDashboard?cSearch=${cSearch}`);
            if (response.status === 200) {
                // console.log(response,'response');
                const ciData = response?.data?.design;
                dispatch(getCategoryniItems(ciData ));
                console.log(ciData, '88888888888888888888888888888ciData');
            } else {
                console.error("Failed to fetch category list");
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    }
};

