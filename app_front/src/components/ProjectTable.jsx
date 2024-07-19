import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const ProjectTable = () => {
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
      const response = await axios.get('http://localhost:3003/api/auth/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
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

  const handleDeleteProject = async project => {
    try {
      await axios.delete(`http://localhost:3003/api/auth/projects/${project._id}`);
      fetchProjects();
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalOk = async values => {
    if (currentProject) {
      await axios.put(`http://localhost:3003/api/auth/projects/${currentProject._id}`, values);
    } else {
      await axios.post('http://localhost:3003/api/auth/projects', values);
    }
    fetchProjects();
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Nom', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Database URL', dataIndex: 'databaseUrl', key: 'databaseUrl' },
    { title: 'Dev URL', dataIndex: 'devUrl', key: 'devUrl' },
    { title: 'PreProd URL', dataIndex: 'preProdUrl', key: 'preProdUrl' },
    { title: 'Prod URL', dataIndex: 'prodUrl', key: 'prodUrl' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEditProject(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteProject(record)} />
        </>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Rechercher un projet"
        prefix={<SearchOutlined />}
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProject} style={{ marginBottom: 20 }}>
        Ajouter un projet
      </Button>
      <Table
        columns={columns}
        dataSource={filteredProjects}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={currentProject ? 'Modifier le projet' : 'Ajouter un projet'}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <ProjectForm
          project={currentProject}
          onSubmit={handleModalOk}
        />
      </Modal>
    </div>
  );
};

const ProjectForm = ({ project, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (project) {
      form.setFieldsValue(project);
    } else {
      form.resetFields();
    }
  }, [project, form]);

  const onFinish = values => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Nom"
        rules={[{ required: true, message: 'Veuillez entrer le nom du projet' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="databaseUrl"
        label="Database URL"
        rules={[{ required: true, message: 'Veuillez entrer l\'URL de la base de données' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="devUrl"
        label="Dev URL"
        rules={[{ required: true, message: 'Veuillez entrer l\'URL de développement' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="preProdUrl"
        label="PreProd URL"
        rules={[{ required: true, message: 'Veuillez entrer l\'URL de pré-production' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="prodUrl"
        label="Prod URL"
        rules={[{ required: true, message: 'Veuillez entrer l\'URL de production' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {project ? 'Modifier' : 'Ajouter'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectTable;
