// import React from 'react'
// import { Card, Form, Typography, Input, Button, Row, Col, Alert,Spin } from 'antd';
// import { Link } from 'react-router-dom';
// import loginImage from '../assets/login.png';
// import useLogin from '../Hooks/useLogin';

// const Login = () => {
//   const {error , loading , loginUser}= useLogin();

//   const handleLogin = async (values)=> {
//     await loginUser(values);
//   }
//   return (
//     <div>
//        <Card className="form-container">
//          <Row justify="center" gap="large ">


//           {/* images */}
//           <Col xs={24} sm={24} md={10} lg={12}>
//              <img src={loginImage} className='image' />
//            </Col>



//            {/* form */}
//            <Col xs={24} sm={20} md={14} lg={12}>
//              <Typography.Title level={3} strong className="title">
//                Sign In
//              </Typography.Title>
//              <Typography.Title level={5} strong 
//              className="title"
//              type="secondary"  >
//                Unlock you world!
//              </Typography.Title>
//              <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
              

//                {/* Email */}
//                <Form.Item
//                 className= "name"
//                  label="Email"
//                  name="email"
//                  rules={[
//                    {
//                      required: true,
//                      message: "Please input your email",
//                    },
//                    {
//                      type: 'email',
//                      message: 'The input is not a valid email',
//                    },
//                  ]}
//                >
//                  <Input size="large" placeholder="Enter your email" />
//                </Form.Item>

//                {/* Password */}
//                <Form.Item
//                 className= "name"
//                  label="Password"
//                  name="password"
//                  rules={[
//                    {
//                      required: true,
//                      message: "Please input your password",
//                    },
//                  ]}
//                >
//                  <Input.Password size="large" placeholder="Enter your Password" />
//                </Form.Item>


//                  {
//                     error && (<Alert 
//                         description={error} 
//                         type='error' 
//                         showIcon 
//                         closable  
//                         className="alert" />
//                 )} 




//                {/* Submit Button */}
//                <Form.Item>
//                  <Button  type={`${loading ? '' : "primary "}`} 
//                          htmlType="submit" size="large" className="btn">
//                    {loading ? <Spin />: 'Sign In '}  
                    
//                  </Button>
//                </Form.Item>

//                {/* Link to Login */}
//                <Form.Item>
//                  <Link to="/">
//                    <Button size="large" className="btn">
//                      Create an Account 
//                    </Button>
//                  </Link>
//                </Form.Item>
//              </Form>
//            </Col>
           
//          </Row>
//        </Card>
//      </div>
//   )
//  }

// export default Login;







import React from 'react';
import { Card, Form, Typography, Input, Button, Row, Col, Alert, Spin } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import loginImage from '../assets/login.png';
import useLogin from '../Hooks/useLogin';
import { useAuth } from '../Contexts/AuthContext';

const Login = () => {
  const { login, isAuthenticated, userData } = useAuth();
  const { error, loading, loginUser } = useLogin();

  const handleLogin = async (values) => {
    await loginUser(values);
  };

  if (isAuthenticated && userData && userData.role === 'SUPERADMIN') {
    return <Navigate to="/admin" />;
  } else if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Card className="form-container">
        <Row justify="center" gap="large ">
          {/* Image */}
          <Col xs={24} sm={24} md={10} lg={12}>
            <img src={loginImage} className='image' alt="login" />
          </Col>

          {/* Form */}
          <Col xs={24} sm={20} md={14} lg={12}>
            <Typography.Title level={3} strong className="title">
              Sign In
            </Typography.Title>
            <Typography.Title level={5} strong type="secondary">
              Unlock your world!
            </Typography.Title>
            <Form layout="vertical" onFinish={handleLogin} autoComplete="off">

              {/* Email */}
              <Form.Item
                className="name"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                  {
                    type: 'email',
                    message: 'The input is not a valid email',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter your email" />
              </Form.Item>

              {/* Password */}
              <Form.Item
                className="name"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password",
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Enter your Password" />
              </Form.Item>

              {/* Error Message */}
              {error && (
                <Alert
                  description={error}
                  type='error'
                  showIcon
                  closable
                  className="alert"
                />
              )}

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="btn"
                  loading={loading}
                >
                  {loading ? <Spin /> : 'Sign In'}
                </Button>
              </Form.Item>

              {/* Link to Register */}
              <Form.Item>
                <Link to="/">
                  <Button size="large" className="btn">
                    Create an Account
                  </Button>
                </Link>
              </Form.Item>

            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Login;

