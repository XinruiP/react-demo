import React, { useState } from 'react';
import { Button, Modal, Form, Select, Upload,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { QuerySecondLeader,ExecFileUpload } from '../api/api';
const Sumbit = ({ isopen, setOpen, processInstanceId, taskId,handleQueryWaitListRef }) => {
    const [loading, setLoading] = useState(false);
    const [leaderList, setLeaderList] = useState([]);
    const token = localStorage.getItem('token');
    const [fileList, setFileList] = useState([]);
    const [selectedUserId,setUserId] = useState(null);
    const handleQueryLeader = () => {
        QuerySecondLeader(token, processInstanceId)
            .then(Response => {
                setLeaderList(Response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const handleUpload = async () =>{
        try {
            // 调用文件上传方法，并传递文件、token 以及其他参数
            await ExecFileUpload(fileList[0].originFileObj, token, taskId, selectedUserId,processInstanceId);
            message.success('执行成功');
            handleQueryWaitListRef.current();
        } catch (error) {
            message.error('执行失败');
            console.error('文件上传失败:', error);
            // 处理文件上传失败的情况
        }
    }
    const handleChange = (value)=>{
        setUserId(value)
    }
    const options = leaderList.map(leaderList => ({
        label: leaderList.name,
        value: leaderList.id
    }));
    const handleOk = async () => {
        setLoading(true);
        await handleUpload()
        setTimeout(() => {
            setLoading(false);
            setOpen(false)
        }, 1000);
    };
    const handleCancel = () => {
        setOpen(false)
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
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

                <Form.Item label="请选择由哪位领导审批">
                    <Select options={options} onClick={handleQueryLeader} onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card"   fileList={fileList} onChange={({ file }) => setFileList([file])}>
                        <button
                            style={{
                                border: 0,
                                background: 'none',
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </button>
                    </Upload>
                </Form.Item>
            </Modal>
        </>
    );
};
export default Sumbit;