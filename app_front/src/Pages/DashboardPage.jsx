import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import ProjectTable from '../components/ProjectTable';

const { Header, Content, Sider } = Layout;

const DashboardPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#001529' }}>
        <div style={{ color: 'white', fontSize: '20px' }}>Dashboard</div>
        {isAuthenticated ? (
          <Button type="primary" onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
        )}
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">
              <Link to="/dashboard">Projects</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <ProjectTable />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
