// import React from 'react';
// import { useAuth } from '../Contexts/AuthContext';
// import { Avatar, Button, Card, Row, Typography } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import { Navigate } from 'react-router-dom'; // Assurez-vous d'importer Navigate si nécessaire

// const Dashboard = () => {
//   const { userData , logout } = useAuth();
//   const handleLogout = async () => {
//       await logout();
//   };

//   return (
//     <Card className='profile-card'>
//     <Row justify="center" align="middle" gutter={16} style={{ textAlign: 'center' }}>
//       <Avatar size={150} icon={<UserOutlined />} className='avatar' />
//       <div>
//         <Typography.Title level={2} strong className='username'>
//           {userData.name}
//         </Typography.Title>
//         <Typography.Title type='secondary' level={2}  strong>
//           Email: {userData.email}
//         </Typography.Title>
//         <Typography.Text type='secondary' strong>
//           Role: {userData.role}
//         </Typography.Text>
//       </div>
//       <Button size='large' type='primary' onClick={handleLogout} className='profile-btn'>
//         Logout
//       </Button>
//     </Row>
//   </Card>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Avatar, Button, Card, Row, Typography, Table, Input, Layout, Menu, Modal, Form } from 'antd';
import { UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom'; // Assurez-vous d'importer Navigate si nécessaire
import axios from 'axios';
import '../App.css';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const { userData, logout, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(projects.filter(project => project.name.toLowerCase().includes(search.toLowerCase())));
  }, [search, projects]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleAddProject = () => {
    setCurrentProject(null);
    setIsModalVisible(true);
  };

  const handleEditProject = project => {
    setCurrentProject(project);
    setIsModalVisible(true);
  };

  const handleDeleteProject = async id => {
    try {
      await axios.delete(`/api/auth/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
    }
  };

  const handleModalOk = async values => {
    try {
      if (currentProject) {
        await axios.put(`/api/auth/projects/${currentProject._id}`, values);
      } else {
        await axios.post('/api/auth/projects', values);
      }
      fetchProjects();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du projet:', error);
    }
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Base de données',
      dataIndex: 'databaseUrl',
      key: 'databaseUrl',
    },
    {
      title: 'Dev URL',
      dataIndex: 'devUrl',
      key: 'devUrl',
    },
    {
      title: 'Pre-Prod URL',
      dataIndex: 'preProdUrl',
      key: 'preProdUrl',
    },
    {
      title: 'Prod URL',
      dataIndex: 'prodUrl',
      key: 'prodUrl',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => handleEditProject(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteProject(record._id)} />
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Tableau de bord</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1">Projets</Menu.Item>
            <Menu.Item key="2" onClick={handleLogout}>Déconnexion</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Card className='profile-card'>
              <Row justify="center" align="middle" gutter={16} style={{ textAlign: 'center' }}>
                <Avatar size={150} icon={<UserOutlined />} className='avatar' />
                <div>
                  <Typography.Title level={2} strong className='username'>
                    {userData.name}
                  </Typography.Title>
                  <Typography.Title type='secondary' level={2} strong>
                    Email: {userData.email}
                  </Typography.Title>
                  <Typography.Text type='secondary' strong>
                    Rôle: {userData.role}
                  </Typography.Text>
                </div>
              </Row>
            </Card>
            <div style={{ marginBottom: 16 }}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Rechercher des projets"
                value={search}
                onChange={handleSearch}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProject} style={{ float: 'right' }}>
                Ajouter un projet
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={filteredProjects}
              pagination={{ pageSize: 5 }}
              rowKey="_id"
            />
            <Modal
              title={currentProject ? "Modifier le projet" : "Ajouter un projet"}
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <Form
                initialValues={currentProject || { name: '', description: '', databaseUrl: '', devUrl: '', preProdUrl: '', prodUrl: '' }}
                onFinish={handleModalOk}
              >
                <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom du projet' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                  <Input />
                </Form.Item>
                <Form.Item name="databaseUrl" label="Base de données URL" rules={[{ required: true, message: 'Veuillez entrer l\'URL de la base de données' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="devUrl" label="Dev URL" rules={[{ required: true, message: 'Veuillez entrer l\'URL de développement' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="preProdUrl" label="Pre-Prod URL" rules={[{ required: true, message: 'Veuillez entrer l\'URL de pré-production' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="prodUrl" label="Prod URL" rules={[{ required: true, message: 'Veuillez entrer l\'URL de production' }]}>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {currentProject ? "Modifier" : "Ajouter"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
