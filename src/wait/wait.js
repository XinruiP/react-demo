import React, { useState, useEffect, useRef } from 'react';
import { Button, Table } from 'antd';
import { QueryWaitToDo, QueryFileUrl,QueryActivity } from '../api/api';
import Variables from './variables';
import Sumbit from './sumbit';
import Leader from './leaderexec';
import FlowMap from './flowmap';
const Wait = () => {
    const [modl, setModl] = useState(false);
    const [modl2, setModl2] = useState(false);
    const [modl3, setModl3] = useState(false);
    const [modl4, setModl4] = useState(false);
    const [selectedProcessId, setSelectedProcessId] = useState(null)
    const [idOfTask, setIdOfTask] = useState(null)
    const handleQueryWaitListRef = useRef(null);
    const localStorageData = localStorage.getItem("data");
    const dataJson = JSON.parse(localStorageData || "{}"); // 使用默认值{}以避免解析错误
    const [activity,setActivity] = useState({})
    const role = dataJson.role;
    const showModal = (processInstanceId, idOfTask) => {
        setSelectedProcessId(processInstanceId)
        setIdOfTask(idOfTask)
        setModl(true);
    };
    const showModal2 = (processInstanceId, idOfTask) => {
        setSelectedProcessId(processInstanceId)
        setIdOfTask(idOfTask)
        setModl2(true);
    };
    const showModal3 = (processInstanceId, idOfTask) => {
        setSelectedProcessId(processInstanceId)
        setIdOfTask(idOfTask)
        setModl3(true);
    };
    const showModal4 = (processId) => {
        handleQueryActivity(processId)
        setModl4(true);
    };
    const columns = [
        {
            title: '流程实例id',
            dataIndex: 'processInstanceId',
            key: 'processInstanceId',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
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
                    <Button onClick={() => handleQueryUrl(record.processInstanceId)}>
                        查看文件
                    </Button>
                    <Button onClick={() => showModal4(record.processInstanceId)}>
                        查看流程图
                    </Button>
                    {role === "负责人" && <Button onClick={() => showModal2(record.processInstanceId, record.idOfTask)}>
                        执行流程
                    </Button>}
                    {role === "责任领导" && <Button onClick={() => showModal3(record.processInstanceId, record.idOfTask)}>
                        审批
                    </Button>}
                </>)
            }

        },
    ];
    const [waitList, setWaitList] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        const handleQueryWaitList = () => {
            QueryWaitToDo(token)
                .then(Response => {
                    console.log(Response.data.data);
                    setWaitList(Response.data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        };
        // 将 handleQueryWaitList 方法赋值给 Ref
        handleQueryWaitListRef.current = handleQueryWaitList;
        // 在组件挂载时执行异步操作
        handleQueryWaitList();
    }, [token]); // token 是 handleQueryWaitList 函数的依赖项
    const handleQueryUrl = (processId) =>{
        console.log(processId);
        QueryFileUrl(processId,token)
        .then(Response =>{
            console.log(Response.data.data);
            window.open(Response.data.data, '_blank'); // 在新标签页中打开文件URL
        })
        .catch(error=>{
            console.log(error);
        })
    }
    const handleQueryActivity = (processId) =>{
        QueryActivity(processId,token)
        .then(Response=>{
            setActivity(Response.data.data)
        })
        .catch(error=>{
            console.log(error);
        })
    }
    const data = waitList.map((item, index) => ({
        key: index,
        idOfTask: item.id,
        processInstanceId: item.processInstanceId,
        flow: item.processDefinitionId.includes("demo1") ? "流程一" : (item.processDefinitionId.includes("demo2") ? "流程二" : ""),
        status:"正在审核",
        createTime: item.created,
        name: item.name,
        assignee: item.assignee,
    }));
    return (
        <>
            <Table columns={columns} dataSource={data} />
            <Variables isopen={modl} setOpen={setModl} processInstanceId={selectedProcessId} />
            <Sumbit isopen={modl2} setOpen={setModl2} processInstanceId={selectedProcessId} taskId={idOfTask} handleQueryWaitListRef={handleQueryWaitListRef} />
            <Leader isopen={modl3} setOpen={setModl3} taskId={idOfTask} handleQueryWaitListRef={handleQueryWaitListRef} />
            <FlowMap isopen={modl4} setOpen={setModl4} activity={activity}/>
        </>

    )
};
export default Wait;