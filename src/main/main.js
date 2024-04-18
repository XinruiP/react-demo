import React, { useState } from 'react';
import Wait from '../wait/wait';
import './main.css'
import AllFlow from '../allflow/allflow';
import Already from '../alreadydo/already';
import { MailOutlined, UserOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Menu, FloatButton, Card, Layout,theme } from 'antd';
const {  Content, Footer, Sider } = Layout;
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
  getItem('我的待办', '2', <PieChartOutlined />),
  getItem('我的已办', '3', <DesktopOutlined />),
  getItem('个人信息', '4', <ContainerOutlined />),
];
const Main = () => {
  const history = useHistory();
  const [selectedKey, setSelectedKey] = useState('1');
  const [userData, setUserData] = useState(null); // State to hold user data
  const { token: { colorBgContainer } } = theme.useToken();
  const onClick = (e) => {
    setSelectedKey(e.key)
    if (e.key === '4') {
      var data = localStorage.getItem("data")
      setUserData(JSON.parse(data))
    }
  };
  const loginOut = () => {
    localStorage.clear();
    history.push('/login')
    window.location.reload(); // 刷新页面
  }
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          className='navbar'
          onClick={onClick}
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <FloatButton
        icon={<UserOutlined />}
        type="primary"
        style={{
          bottom: 20,
          left: 20,
        }}
        tooltip={<div>
          <div className='loginout' onClick={loginOut}>退出登陆</div>
        </div>}
      />
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div className="content">
            {/* 根据选中的菜单项显示不同的内容 */}
            {selectedKey === '1' &&  <AllFlow />}
            {selectedKey === '2' && <Wait />}
            {selectedKey === '3' && <Already />}
            {selectedKey === '4' &&
              <Card title="个人信息">
                <Card type="inner" title="姓名">
                  {userData.name}
                </Card>
                <Card
                  style={{
                    width: 400,
                    marginTop: 16,
                  }}
                  type="inner"
                  title="角色"
                >
                  {userData.role}
                </Card>
                <Card
                  style={{
                    width: 400,
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
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
           Design ©{new Date().getFullYear()} Created by XinRui
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Main;