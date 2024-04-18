import React, { useState } from 'react';
import { Button, Modal, Form, Select,message, Input } from 'antd';
import { LeaderExame } from '../api/api';
const Leader = ({ isopen, setOpen, taskId,handleQueryWaitListRef }) => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const [isagree,setIsagree] = useState('')
    const [result,setResult] = useState('')
    const handleOk =  () => {
        setLoading(true);
        setTimeout(() => {
            handleExamine()
            setLoading(false);
            setOpen(false)
        }, 1000);
    };
    const handleCancel = () => {
        setOpen(false)
    };
    const handleChange = (value) => {
        setIsagree(value)
    }
    const handleExamine = () =>{
        LeaderExame(token,taskId,isagree,result)
        .then(Response =>{
            message.success('审核成功')
            handleQueryWaitListRef.current();
        })
        .catch(error =>{
            message.error('审核失败')
            console.log(error)
        })
    }
    const options = [
        {
            "label":"通过",
            "value":"agree"
        },
        {
            "label":"不通过",
            "value":"disagree"
        }
    ]
    return (
        <>
            <Modal
                open={isopen}
                title="表单内容"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button  key="back" type="primary" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        确认
                    </Button>
                ]}
            >

                <Form.Item label="请审批">
                    <Select options={options}  onChange={handleChange}/>
                </Form.Item>
                {isagree === "disagree" && <Form.Item label="请输入原因">
                    <Input onChange={e => setResult(e.target.value)}/>
                </Form.Item>}
            </Modal>
        </>
    );
};
export default Leader;