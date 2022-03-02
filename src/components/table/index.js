/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import { useState, useEffect } from 'react';
import { Table, Radio, Divider } from 'antd';

const Index = ({
    propsColumns= [],
    propsDataSource= [],
    style= {},
    onChange= () => {},
    onSelected= () => {}
}) => {

    const [ stateSelectedRowKeys, setSelectedRowKeys ] = useState([]);

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys( selectedRowKeys );
    };

    const rowSelection = {
        stateSelectedRowKeys,
        onChange: onSelectChange,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE,
          {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              });
              setSelectedRowKeys( newSelectedRowKeys );
            },
          },
          {
            key: 'even',
            text: 'Select Even Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              });
              setSelectedRowKeys( newSelectedRowKeys );
            },
          },
        ]
    };

    useEffect(() => {
        onSelected( stateSelectedRowKeys );
    },[stateSelectedRowKeys]);

    return(
        <Table
            rowSelection={rowSelection} 
            dataSource={propsDataSource}
            columns={propsColumns} 
            scroll={{ x: 1500 }}
            indentSize= {20}
            style= {style}
            pagination= {false}
            onChange={onChange.bind(this)}
        />
    );
}

export default Index;