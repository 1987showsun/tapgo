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
        delivery_date: "",
        city: [],
        order_status: "",
        fulfillment_status: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let mergeNewSearchCondition = {};
        Object.keys(stateSearch).forEach( key => {
            delete searchToObject[key];
            if( stateSearch[key].length!==0 ){
                mergeNewSearchCondition = { ...mergeNewSearchCondition, [key]: stateSearch[key] };
            }
        });
        
        navigate({
            pathname: pathname,
            search: querySting.stringify({
                ...mergeNewSearchCondition
            })
        })
        
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
                    <button type="button" className="clear">清除</button>
                </div>
            </form>
        </Drawer>
    );
}

export default Filter;