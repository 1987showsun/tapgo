/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
export default (
    state = {
        token: ""
    },action
) => {
    const { type="", token="" } = action;
    switch( type ){
        case "AUTH_TOKEN":
            state = { ...state, token: token };
            break;

        default:
            state = { ...state, token: typeof window!=='undefined'? (localStorage.getItem('AUTH_TOKEN')||""):"" };
            break;
    }
    return state;
}
