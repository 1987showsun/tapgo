/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import { useState, useEffect, useMemo } from "react";
import { Pagination } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa'

// Components
import Table from '../../../components/table';
import Filter from './components/filter';

// Actions
import { getOrdersAction } from '../../../redux/actions/order';

// Stylesheets
import './public/style/style.scss';

const TalbeColumns = ( key, status ) => {

    const statusToString = status=="false"? "ascend":"descend";

    return [
        {
            title: '訂單編號',
            dataIndex: 'order_name',
            key: 'order_name',
            fixed: 'left',
            sorter: {},
            defaultSortOrder: key==="order_name"? statusToString:null
        },
        {
            title: "顧客",
            dataIndex: "customer_name",
            key: "customer_name",
            width: 120,
            fixed: 'left',
        },
        {
            title: "金額",
            dataIndex: "total_price",
            key: "total_price",
            width: 120,
            align: "right",
            sorter: {},
            defaultSortOrder: key==="total_price"? statusToString:null
        },
        {
            title: "訂單成立時間",
            dataIndex: "created_at",
            key: "created_at",
            sorter: {},
            defaultSortOrder: key==="created_at"? statusToString:null
        },
        {
            title: "訂單狀態",
            dataIndex: "order_status",
            key: "order_status",
            sorter: {},
            defaultSortOrder: key==="order_status"? statusToString:null
        },
        {
            title: "配送日期與時段",
            dataIndex: "delivery_date",
            key: "delivery_date",
            sorter: {},
            defaultSortOrder: key==="delivery_date"? statusToString:null
        },
        {
            title: "配送地址",
            dataIndex: "receiver_address",
            key: "receiver_address",
            sorter: {},
            defaultSortOrder: key==="receiver_address"? statusToString:null
        },
        {
            title: "備註",
            dataIndex: "note",
            key: "note",
        }
    ]
}

const Index = () => {

    const location = useLocation();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname, search } = location;
    const searchToObject = queryString.parse(search) || {};
    const state = useSelector( state => state.order );
    const [ statyeVisible, setVisible ] = useState(false);
    const [ stateSortKey, setSortKey ] = useState( search.indexOf('sort_by')>-1? searchToObject['sort_by']:"" ); 
    const [ stateSortStatus, setSortStatus ] = useState( search.indexOf('is_descending')>-1? searchToObject['is_descending']:"" );

    const handleTableChange = (pagination, filters, sorter) => {
        // console.log(pagination, filters, sorter);
        const { columnKey="", order="" } = sorter;

        delete searchToObject['sort_by'];
        delete searchToObject['is_descending'];

        navigate({
            pathname: pathname,
            search: queryString.stringify({
                ...searchToObject,
                ...order!==""? {
                    sort_by: columnKey,
                    is_descending: order=="ascend"? false:true
                }:null
            })
        });

    }

    const handleCheckBoxSelected = (val) => {
        // console.log('Table checkbox selected :', val);
    }

    const handlePageChange = (page, pageSize) => {
        // console.log('Pagination page change :', page, pageSize);
        navigate({
            pathname: pathname,
            search: queryString.stringify({
                ...searchToObject,
                page: page,
                size: pageSize
            })
        });
    }

    const handlePageSizeChange = (current, size) => {
        // console.log('Pagination page size change :', current, size);
    }

    useEffect(() => {
        
        setSortKey( search.indexOf('sort_by')>-1? searchToObject['sort_by']:"" );
        setSortStatus( search.indexOf('is_descending')>-1? searchToObject['is_descending']:"" );

        dispatch(
            getOrdersAction({ 
                query: {
                    ...searchToObject
                }
            })
        );
    },[ search ]);

    const { 
        ordersList=[],
        ordersTotal= 0
    } = state;

    const {
        page=1,
        size=20
    } = searchToObject;

    return(
        <>           
            <div className="main-row order-head">
                <div className="page-title">Order</div>
                <div className="page-action">
                    <button className="output-form-btn">轉出貨單</button>
                    <button 
                        className= "output-form-btn" 
                        onClick= {() => setVisible(true)}
                    >
                            <i><FaFilter size="13px"/></i>條件篩選
                    </button>
                </div>
            </div>

            <div className="main-row">
                <div className="main-col" data-align="right">
                    <Pagination 
                        current= {Number(page)}
                        pageSize= {size}
                        total= {ordersTotal}
                        onChange= {handlePageChange.bind(this)}
                        onShowSizeChange= {handlePageSizeChange.bind(this)}
                    />
                </div>
            </div>

            <div className="main-row">
                <div className="main-col">
                    <Table
                        propsDataSource= {ordersList}
                        propsColumns= {TalbeColumns(stateSortKey, stateSortStatus)} 
                        onChange= {handleTableChange.bind(this)}
                        onSelected= {handleCheckBoxSelected.bind(this)}
                        style= {{ "marginBottom": "20px" }}
                    />
                </div>
            </div>

            <div className="main-row">
                <div className="main-col" data-align="right">
                    <Pagination 
                        current= {Number(page)}
                        pageSize= {size}
                        total= {ordersTotal}
                        onChange= {handlePageChange.bind(this)}
                        onShowSizeChange= {handlePageSizeChange.bind(this)}
                    />
                </div>
            </div>

            <Filter 
                propsVisible= {statyeVisible}
                onVisible= {(val) => setVisible(val)}
            />
        </>
    );
}

export default Index;