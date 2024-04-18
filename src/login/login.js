import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { Button, Input, Space, message } from 'antd';
import { LoginApi } from '../api/api'
import '../login/login.css'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const handleLogin = () => {
        // 发起登录请求
        LoginApi(username, password)
            .then(response => {
                // 处理登录成功的情况
                console.log('登录成功:', response.data);
                // 这里可以做一些登录成功后的处理，比如跳转页面等
                var data = JSON.stringify(response.data.data)
                localStorage.setItem('data', data)
                history.push('/main');
                localStorage.setItem('token', response.data.data.token)
                message.success('登录成功');
            })
            .catch(error => {
                // 处理登录失败的情况
                console.error('登录失败:', error);
                // 这里可以做一些登录失败后的处理，比如显示错误信息等
                message.error('登录失败，请检查用户名和密码');
            });
    };
    return (
        <div className='box'>
            <div className='loginbox'>
                <Space direction="vertical">
                    <p>用户登陆</p>
                    <Input placeholder="输入用户名" className="login-input" prefix={<UserOutlined />} onChange={e => setUsername(e.target.value)} />
                    <Input.Password placeholder="输入密码" className="login-input" prefix={<SecurityScanOutlined />} onChange={e => setPassword(e.target.value)} />
                    <Button className="login-button" type="primary" onClick={handleLogin}>登陆</Button>
                </Space>
            </div>
        </div>
    );
};
export default Login;