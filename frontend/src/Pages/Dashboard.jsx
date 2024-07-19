import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Avatar, Button, Card, Row, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom'; // Assurez-vous d'importer Navigate si nécessaire

const Dashboard = () => {
  const { userData , logout } = useAuth();
  const handleLogout = async () => {
      await logout();
  };

  return (
    <Card className='profile-card'>
    <Row justify="center" align="middle" gutter={16} style={{ textAlign: 'center' }}>
      <Avatar size={150} icon={<UserOutlined />} className='avatar' />
      <div>
        <Typography.Title level={2} strong className='username'>
          {userData.name}
        </Typography.Title>
        <Typography.Title type='secondary' level={2}  strong>
          Email: {userData.email}
        </Typography.Title>
        <Typography.Text type='secondary' strong>
          Role: {userData.role}
        </Typography.Text>
      </div>
      <Button size='large' type='primary' onClick={handleLogout} className='profile-btn'>
        Logout
      </Button>
    </Row>
  </Card>
  );
};

export default Dashboard;




