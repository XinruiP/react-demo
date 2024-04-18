import React, { useState } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Bpmn1 from './bpmn1';
import Form1 from './form1';
const items = [
  {
    label: '流程一',
    key: '1',
    icon: <AppstoreOutlined />,
  },
  {
    label: '流程二',
    key: '2',
    icon: <AppstoreOutlined />,
  },
  {
    label: '流程三',
    key: '3',
    icon: <AppstoreOutlined />,
  },
  {
    label: '流程四',
    key: '4',
    icon: <AppstoreOutlined />,
  },
];
const AllFlow = () => {
  const [current, setCurrent] = useState('1');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{width:700}}/>
    { current ==='1' && <><Bpmn1/><Form1/></>}
    </>
  )
};
export default AllFlow;