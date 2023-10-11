import React from 'react';
// import './style.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, GatewayOutlined, FundOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import Home from '../Home';
import Eval from '../Eval';
import Demo from '../Demo';
import { HOME_ROUTE, EVAL_ROUTE, DEMO_ROUTE } from '../../constants/routes';

const { Header, Content, Footer, Sider } = Layout;
const { useState } = React
const colorBgContainer = '#ffffff'

const items = [{
    key: HOME_ROUTE,
    icon: React.createElement(HomeOutlined),
    label: 'Home',
}, {
    key: DEMO_ROUTE,
    icon: React.createElement(GatewayOutlined),
    label: 'Demo',
}, {
    key: EVAL_ROUTE,
    icon: React.createElement(FundOutlined),
    label: 'Eval',
}]

const NavBar = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);
    const handleOnClick = ({ key }) => {
        console.log('Current route:', key);
        navigate(key)
    }
    return (
        <Layout>
          <Sider 
            style={{
                height: '100vh'
            }}
            trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu onClick={handleOnClick} theme="dark" mode="inline" defaultSelectedKeys={['/']} items={items} />
          </Sider>
          <Layout>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
                >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <b>CryptoAI</b>
            </Header>

            <Content
                style={{
                    margin: '24px 16px 0',
                    overflow: 'initial',
                }}
            >
            <div
                style={{
                    padding: 24,
                    textAlign: 'left',
                    background: colorBgContainer,
                    borderRadius: '15px',
                    height: '100%'
                }}
            >
                <Routes>
                    <Route exact path={HOME_ROUTE} element={<Home />} />
                    <Route path={DEMO_ROUTE} element={<Demo />} />
                    <Route path={EVAL_ROUTE} element={<Eval />} />
                </Routes>
            </div>
            </Content>
            
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              CryptoAI by Team MCS14
            </Footer>
          </Layout>
        </Layout>
    );
}

export default NavBar;