import axios from "axios";

const url = "http://60.204.213.112:1323"
// 登录接口
export async function LoginApi(username, password) {
    return axios.post(`${url}/login`, {
        username: username,
        password: password
    });
}
// 二级公司查询
export async function QueryFirstDepartment(token) {
    return axios.get(`${url}/api/v1/queryTwoGradeCompany`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
// 二级负责人查询
export async function QueryTwoGradeUser(companyId, token) {
    return axios.get(`${url}/api/v1/queryTwoGradeUser?companyId=${companyId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
// 发起流程一
export async function SendFlowOne(variables, token) {
    return axios.post(`${url}/api/v1/sendApproval`, {
        variables: variables,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
// 查询待办
export async function QueryWaitToDo(token) {
    return axios.get(`${url}/api/v1/queryWaitToDo`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
// 查询流程变量
export async function QueryVariables(token, processInstanceId) {
    return axios.get(`${url}/api/v1/queryVariables`, {
        params: {
            processInstanceId: processInstanceId,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
// 查询二级领导
export async function QuerySecondLeader(token,processInstanceId) {
    return axios.get(`${url}/api/v1/queryTwoGradeLeader`, {
        params: {
            processInstanceId: processInstanceId,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
// 执行上传文件
export async function ExecFileUpload(file,token,id_of_task,user_id,processInstanceId) {
     // 创建一个 FormData 对象
     const formData = new FormData();
     // 将文件添加到 FormData 中
     formData.append('file', file);
     formData.append('id_of_task', id_of_task.toString());
    formData.append('user_id', user_id);
    formData.append('processInstanceId', processInstanceId);
     try {
         // 发送 POST 请求
         const response = await axios.post(`${url}/api/v1/upload`, formData, {
             headers: {
                 'Content-Type': 'multipart/form-data',
                 Authorization: `Bearer ${token}`
             }
         });
         return response;
     } catch (error) {
         // 处理错误
         console.error('文件上传失败:', error);
         throw error;
     }
}
// 查询已办
export async function QueryFinished(token) {
    return axios.get(`${url}/api/v1/queryFinished`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
// 领导审批
export async function LeaderExame(token,taskId,isagree,result) {
    return axios.post(`${url}/api/v1/examine`,{
        process_instance_id:taskId,
        is_agree:isagree,
        result:result
    },{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
// 获取文件路径
export async function QueryFileUrl(processInstanceId,token) {
    return axios.get(`${url}/api/v1/queryFileUrl`,{
        params: {
            processInstanceId: processInstanceId,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
// 获取活动实例
export async function QueryActivity(processInstanceId,token){
    return axios.get(`${url}/api/v1/queryActivity`, {
        params: {
            processInstanceId: processInstanceId,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
