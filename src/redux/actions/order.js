/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import axios from 'axios';
import queryString from 'query-string';
import api from './api';

export const getOrdersAction = (val={}) => {
    return (dispatch) => {
        const { method="get", query={}, data={} } = val;
        const initalQuery = {};
        const search = queryString.stringify({ ...initalQuery, ...query });
        const url = `${api.order.list}${search==''? '':`?${search}`}`;

        return axios({ method, url, data }).then( res => {
            const { content=[], size=10, total_elements=0 } = res.data;

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });

            dispatch({
                type: "SET_ORDERS",
                list: content.map( item => ({ 
                    ...item, 
                    key: item.order_name,
                    total_price: formatter.format(item.total_price),
                    order_status: item.order_status==="open"? "已開啟":"已關閉"
                })),
                pageSize: size,
                total: total_elements
            })
        });

    }
}