/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { DatePicker, Select, Drawer } from 'antd';
import moment from 'moment';
import querySting from 'query-string';

import cityOptions from '../../../../public/data/city.json';

const { Option } = Select;

const Filter = ({
    propsVisible= false,
    onVisible= () => {}
}) => {

    const dateFormat = 'YYYY/MM/DD';
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname, search } = location;
    const searchToObject = querySting.parse(search);

    const [ stateSearch, setSearch ] = useState({
        delivery_date: search.indexOf('delivery_date')>-1? searchToObject['delivery_date']:"",
        city: search.indexOf('city')>-1? searchToObject['city'].split(',').filter(item => item!==""):[],
        order_status: search.indexOf('order_status')>-1? searchToObject['order_status']:"",
        fulfillment_status: search.indexOf('fulfillment_status')>-1? searchToObject['fulfillment_status']:""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let mergeNewSearchCondition = {};
        Object.keys(stateSearch).forEach( key => {
            delete searchToObject[key];
            if( stateSearch[key].length!==0 ){
                if( Array.isArray(stateSearch[key]) ){
                    mergeNewSearchCondition = { ...mergeNewSearchCondition, [key]: stateSearch[key].join() };
                }else{
                    mergeNewSearchCondition = { ...mergeNewSearchCondition, [key]: stateSearch[key] };
                }
            }
        });
        
        navigate({
            pathname: pathname,
            search: querySting.stringify({
                ...mergeNewSearchCondition
            })
        });

        onVisible( false );
    }

    const handleClear = () => {

        let mergeNewSearchCondition = {};
        Object.keys(stateSearch).forEach( key => {
            if( Array.isArray(stateSearch[key]) ){
                mergeNewSearchCondition = { ...mergeNewSearchCondition, [key]: [] };
            }else if( typeof stateSearch[key]==='object' ){
                mergeNewSearchCondition = { ...mergeNewSearchCondition, [key]: {} };
            }else if( typeof stateSearch[key]==='number' ){
                mergeNewSearchCondition = { ...mergeNewSearchCondition, [key]: 0 };
            }else{
                mergeNewSearchCondition = { ...mergeNewSearchCondition, [key]: "" };
            }
        });

        setSearch(mergeNewSearchCondition);

        navigate({
            pathname: pathname,
            search: null
        });
        onVisible( false );
    }

    const { 
        delivery_date, 
        city, 
        order_status, 
        fulfillment_status 
    } = stateSearch;

    return(
        <Drawer title="訂單條件篩選" placement="right" onClose={onVisible.bind(this, false)} visible={propsVisible}>
            <form className="order-filter-form" onSubmit={handleSubmit.bind(this)}>
                <div className="form-item">
                    <DatePicker 
                        defaultValue= {delivery_date!==""? moment(delivery_date, dateFormat):null} 
                        value= {delivery_date!==""? moment(delivery_date, dateFormat):null}
                        format= {dateFormat}
                        className= "search-input-customization"
                        onChange= {(val, dateString) => {
                            setSearch( prev => ({
                                ...prev,
                                delivery_date: dateString
                            }))
                        }}
                    />
                </div>
                <div className="form-item">
                    <Select
                        className= "search-input-customization"
                        mode="multiple"
                        showArrow
                        defaultValue={city}
                        value= {city}
                        options={cityOptions}
                        placeholder="配送縣市"
                        dropdownMatchSelectWidth= {150}
                        onChange={(val) => {
                            setSearch( prev => ({
                                ...prev,
                                city: val
                            }))
                        }}
                    />
                </div>
                <div className="form-item">
                    <Select 
                        className= "search-input-customization"
                        defaultValue= {order_status}
                        value= {order_status}
                        dropdownMatchSelectWidth= {100}
                        onChange= {(val) => {
                            setSearch( prev => ({
                                ...prev,
                                order_status: val
                            }))
                        }}
                    >
                        <Option value="">訂單狀態</Option>
                        <Option value="open">開啟</Option>
                        <Option value="cancelled">取消</Option>
                        <Option value="closed">關閉</Option>
                    </Select>
                </div>
                <div className="form-item">
                    <Select 
                        className= "search-input-customization"
                        defaultValue= {fulfillment_status} 
                        value= {fulfillment_status}
                        dropdownMatchSelectWidth= {100}
                        onChange={(val) => {
                            setSearch( prev => ({
                                ...prev,
                                fulfillment_status: val
                            }))
                        }}
                    >
                        <Option value="">付款狀態</Option>
                        <Option value="received">已收到款項</Option>
                        <Option value="preparing">待收款項</Option>
                    </Select>
                </div>
                <div className="form-item both-btn-item" data-both="true">
                    <button type="submit">確定</button>
                    <button type="button" className="clear" onClick={handleClear.bind(this)}>清除</button>
                </div>
            </form>
        </Drawer>
    );
}

export default Filter;