/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import axios from 'axios';

axios.interceptors.request.use((config) => {
    const AUTH_TOKEN = typeof window!=='undefined'? (localStorage.getItem('AUTH_TOKEN') || ""):"";
    if( config.url.indexOf('lyrics')<0 ){
        config.headers = AUTH_TOKEN!=""? { ...config.headers, authorization: AUTH_TOKEN }:config.headers;
    }else{
        config.headers = { ...config.headers, authorization: '' };
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
        const protocol = window.location.protocol;
        const host =  window.location.host;
        localStorage.removeItem('AUTH_TOKEN');
        window.location.replace(`${protocol}//${host}/sign/in`);
   }
   return error;
 });

const API_ADDRESS = () => {
    const { NODE_ENV="development" } = process.env;
    let API_PATH  = "";
    if( NODE_ENV=="development" ){
        API_PATH  = "https://dev.tapgo.cc/test"
    }
    return API_PATH;
}

export default {
    sign: {
        in: `${API_ADDRESS()}/auth/login`,
    },
    order: {
        list: `${API_ADDRESS()}/orders`,
    }
}