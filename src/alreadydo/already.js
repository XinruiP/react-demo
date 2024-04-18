import React, { useState, useEffect,useRef } from 'react';
import { Button, Table } from 'antd';
import { QueryFinished,QueryFileUrl } from '../api/api';
import Variables from '../wait/variables';
import Sumbit from '../wait/sumbit';
const Already = () => {
    const [modl, setModl] = useState(false);
    const [modl2, setModl2] = useState(false);
    const [selectedProcessId,setSelectedProcessId] = useState(null);
    const [idOfTask,setIdOfTask] = useState(null);
    const handleQueryWaitListRef = useRef(null);
    const [url,setUrl] = useState('');
    const showModal = (processInstanceId,idOfTask) => {
        setSelectedProcessId(processInstanceId)
        setIdOfTask(idOfTask)
        setModl(true);
    };
    console.log(url);
    const columns = [
         {
            title: '流程实例id',
            dataIndex: 'processInstanceId',
            key: 'processInstanceId',
        },
        {
            title: '完成时间',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: '流程名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '申请人',
            dataIndex: 'assignee',
            key: 'assignee',
        },
        {
            title: '所属流程',
            dataIndex: 'flow',
            key: 'flow',
        },
        {
            title: '审核状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '操作',
            render: (text, record) => {
                return (<>
                <Button onClick={() => showModal(record.processInstanceId)}>
                    查看表单
                </Button>
                <Button onClick={()=>handleQueryUrl(record.processInstanceId)}>
                    查看文件
                </Button>
                </>)
            }

        },
    ];
    const [alreadyList, setAlreadyList] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        const handleAlreadyList = () => {
            QueryFinished(token)
                .then(Response => {
                    console.log(Response.data.data);
                    setAlreadyList(Response.data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        };
      
        // 在组件挂载时执行异步操作
        handleAlreadyList();
    }, [token]); // token 是 handleQueryWaitList 函数的依赖项
    const handleQueryUrl = (processId) =>{
        console.log(processId);
        QueryFileUrl(processId,token)
        .then(Response =>{
            console.log(Response.data.data);
            setUrl(Response.data.data)
            window.open(Response.data.data, '_blank'); // 在新标签页中打开文件URL
        })
        .catch(error=>{
            console.log(error);
        })
    }
    const data = alreadyList.map((item, index) => ({
        key: index,
        processInstanceId: item.processInstanceId,
        endTime: item.endTime,
        name: item.name,
        flow:item.processDefinitionKey === "demo1" ? "流程一" : (item.processDefinitionKey === "demo2" ? "流程二" : ""),
        status:item.deleteReason === "completed" ? "已审核" : "审核中",
        assignee: item.assignee,
    }));
    return (
        <>
            <Table columns={columns} dataSource={data} />
            < Variables isopen={modl} setOpen={setModl} processInstanceId={selectedProcessId}/>
            <Sumbit isopen={modl2} setOpen={setModl2} processInstanceId={selectedProcessId} taskId={idOfTask} handleQueryWaitListRef={handleQueryWaitListRef}/>
        </>

    )
};
export default Already;