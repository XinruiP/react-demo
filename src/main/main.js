import React, { useState} from 'react';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Menu, FloatButton,Card } from 'antd';
import Wait from '../wait/wait';
import './main.css'
import AllFlow from '../allflow/allflow';
import Already from '../alreadydo/already';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('全部流程', '1', <MailOutlined />),
    getItem('我的待办', '2', <MailOutlined />),
    getItem('我的已办', '3', <MailOutlined />),
    getItem('个人信息', '4', <MailOutlined />),
];
const Main = () => {
    const history = useHistory();
    const [selectedKey, setSelectedKey] = useState('1');
    const [userData, setUserData] = useState(null); // State to hold user data
    const data = localStorage.getItem("data");
    const dataJson = JSON.parse(data)
    const department = dataJson.department  
    const onClick = (e) => {
        setSelectedKey(e.key)
        if (e.key === '4') {
            var data = localStorage.getItem("data")
            setUserData(JSON.parse(data))
        }
    };
    const loginOut = ()=>{
        localStorage.clear();
        history.push('/login')
        window.location.reload(); // 刷新页面
    }
    return (
        <div className='mainbox'>
            <Menu
                className='navbar'
                onClick={onClick}
                style={{
                    width: 256,

                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
            <FloatButton
                icon={<UserOutlined />}
                type="primary"
                style={{
                    bottom:20,
                    left: 20,
                }}
                tooltip={<div>
                          <div className='loginout' onClick={loginOut}>退出登陆</div>
                        </div>}
            />
            <div className="content">
                {/* 根据选中的菜单项显示不同的内容 */}
                {selectedKey === '1' && department && department.includes("市场综合室+技术商务室") && <AllFlow />}
                {selectedKey === '2' && <Wait />}
                {selectedKey === '3' && <Already />}
                {selectedKey === '4' && 
                    <Card title="个人信息">
                    <Card type="inner" title="姓名">
                      {userData.name}
                    </Card>
                    <Card
                      style={{
                        width:400,
                        marginTop: 16,
                      }}
                      type="inner"
                      title="角色"
                    >
                      {userData.role}
                    </Card>
                    <Card
                      style={{
                        width:400,
                        marginTop: 16,
                      }}
                      type="inner"
                      title="部门信息"
                    >
                      {userData.department.join(',')}
                    </Card>
                  </Card>
                }
            </div>
        </div>
    );
};
export default Main;