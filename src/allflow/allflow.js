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
  const data = localStorage.getItem("data");
  const dataJson = JSON.parse(data)
  const department = dataJson.department
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    { current ==='1' && <Bpmn1/>}
    {current === '1' && department && department.includes("市场综合室+技术商务室") && <Form1/>}
    </>
  )
};
export default AllFlow;