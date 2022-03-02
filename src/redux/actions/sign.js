/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import axios from 'axios';
import queryString from 'query-string';
import api from './api';

export const signinAction = (val={}) => {
    return (dispatch) => {
        const { method="post", query={}, data={} } = val;
        const initalQuery = {};
        const search = queryString.stringify({ ...initalQuery, ...query });
        const url = `${api.sign.in}${search==''? '':`?${search}`}`;

        return axios({ method, url, data }).then( res => {
            const { token="", username="", id="" } = res.data;
            localStorage.setItem("AUTH_TOKEN", token);
            dispatch({
                    type: "SET_AUTH_TOKEN",
                    token: token
            })
        });

        // const token = "123";

    }
}