import React,{useState} from 'react';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    message,
} from 'antd';

import { QueryFirstDepartment,QueryTwoGradeUser,SendFlowOne} from '../api/api';
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};
const Form1 = () => {
    const [department, setDepartment] = useState([]);
    const [user, setUser] = useState([]);
    const [selectedDepartmentId,setDepartmentId] = useState(null);
    const [selectedUserId,setUserId] = useState(null);
    const data = localStorage.getItem('data')
    const token = localStorage.getItem('token')
    const [isDisabled, setIsDisabled] = useState(true); // 新增状态控制是否禁用
    const [input1,setInput1] = useState('')
    const [input2,setInput2] = useState()
    const [input3,setInput3] = useState('')
    const dataJson = JSON.parse(data)
    const variables = {
        department_id: {
            value:  `${selectedDepartmentId}`,
            type: "string"
        },
        two_grade: {
            value:  `${selectedUserId}`,
            type: "string"
        },
        one_grade: {
            value: `${dataJson.user_id}`,
            type: "string"
        },
        filed1: {
            value: `${input1}`,
            type: "string"
        },
        filed2: {
            value: `${input2}`,
            type: "string"
        },
        filed3: {
            value: `${input3}`,
            type: "string"
        },
        // Add more variables as needed
    };
    const options = department.map(department => ({
        label: department.name,
        value: department.id
    }));
    const optionsUser = user.map(user => ({
        label: user.name,
        value: user.id
    }));
    const handleChangeDepart = (value) => {
        setDepartmentId(value)
        setIsDisabled(false)
        console.log(`selected ${value}`);
      };
      const handleChangeUser = (value) => {
        setUserId(value)
        console.log(`selected ${value}`);
      };
    const handleQueryDepart = ()=>{
        QueryFirstDepartment(token)
        .then(response => {
            setDepartment(response.data.data);
        })
        .catch(
            error => {
                console.log(error);
            }
        )
    }
    const handleQueryUser = () =>{
        const departmentIdString = selectedDepartmentId.toString();
        QueryTwoGradeUser(departmentIdString,token)
        .then(Response =>{
            setUser(Response.data.data);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    const handleSendFlow = () =>{
        SendFlowOne(variables,token)
        .then(Response =>{
            message.success('发起流程成功')
        })
        .catch(error =>{
            console.log(error);
            message.error('发起流程失败')
        })
    }
    return (<Form
        {...formItemLayout}
        variant="filled"
        style={{
            maxWidth: 600,
        }}
    >
        <Form.Item
            label="字段一"
            name="Input1"
            rules={[
                {
                    required: true,
                    message: '请输入',
                },
            ]}
        >
            <Input onChange={e => setInput1(e.target.value)}/>
        </Form.Item>

        <Form.Item
            label="数字字段1"
            name="InputNumber"
            rules={[
                {
                    required: true,
                    message: '请输入',
                },
            ]}
        >
            <InputNumber
                style={{
                    width: '100%',
                }}
                onChange={value => setInput2(value)}
            />
        </Form.Item>

        <Form.Item
            label="字段二"
            name="Input2"
            rules={[
                {
                    required: true,
                    message: '请输入',
                },
            ]}
        >
            <Input onChange={e => setInput3(e.target.value)}/>
        </Form.Item>


        <Form.Item
            label="请选择公司"
            name="Select1"
            rules={[
                {
                    required: true,
                    message: '请选择部门!',
                },
            ]}
            
        >   
            <Select  onClick={handleQueryDepart} options={options} onChange={handleChangeDepart}/>
        </Form.Item>

        <Form.Item
            label="请选择员工"
            name="Select2"
            rules={[
                {
                    required: true,
                    message: '请选择人员!',
                },
            ]}
        >
            <Select options={optionsUser} onClick={handleQueryUser} onChange={handleChangeUser} disabled={isDisabled}/>
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 6,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="button" onClick={handleSendFlow} disabled={isDisabled}>
                发起流程
            </Button>
        </Form.Item>
    </Form>)}
export default Form1;