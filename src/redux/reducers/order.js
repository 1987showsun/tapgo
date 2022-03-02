/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */


export default (
    state = {
        ordersList: [],
        ordersPageSize: 10,
        ordersTotal: 0
    },action
) => {
    const { type="", list="", pageSize=10, total=0 } = action;
    switch( type ){
        case "SET_ORDERS":
            state = { 
                ...state, 
                ordersList: list,
                ordersPageSize: pageSize,
                ordersTotal: total
            };
            break;

        // no default
    }
    return state;
}
