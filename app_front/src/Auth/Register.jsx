
//  import React from 'react';
//  import { Card, Form, Typography, Input, Button, Row, Col, Alert,Spin } from 'antd';
//  import { Link } from 'react-router-dom';
//  import registerImage from '../assets/register.png';
// import useSignup from '../Hooks/useSignup';

//  const Register = () => {
//     const {loading , error , registerUser} = useSignup();
//    const handleRegister = (values) => {
//     registerUser (values);

//    };

//    return (
//      <div>
//        <Card className="form-container">
//          <Row justify="center" gap="large ">
//            {/* form */}
//            <Col xs={24} sm={20} md={16} lg={12}>
//              <Typography.Title level={3} strong className="title">
//                Create an account
//              </Typography.Title>
//              <Typography.Title level={5} strong 
//              className="title"
//              type="secondary"  >
//                Join for exclusive access!
//              </Typography.Title>
//              <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
//                {/* Full Name */}
//                <Form.Item 
//                className= "name"
//                  label="Full Name"
//                  name="name"
//                  rules={[
//                    {
//                      required: true,
//                      message: "Please input your full name",
//                    },
//                  ]}
//                >
//                  <Input size="large" placeholder="Enter your Full Name" />
//                </Form.Item>

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

//                {/* Confirm Password */}
//                <Form.Item
//                 className= "name"
//                  label="Confirm Password"
//                  name="passwordConfirmation"
//                  rules={[
//                    {
//                      required: true,
//                      message: "Please confirm your password",
//                    },
//                  ]}
//                >
//                  <Input.Password size="large" placeholder="Re-enter your Password" />
//                </Form.Item>

//                 {
//                     error && (<Alert 
//                         description={error} 
//                         type="error"
//                         showIcon 
//                         closable  
//                         className="alert" />
//                 )} 




//                {/* Submit Button */}
//                <Form.Item>
//                  <Button type={`${loading ? '' : 'primary'}`} 
//                          htmlType="submit" size="large" className="btn">
//                     {loading ? <Spin /> : 'Create Account'} 
//                  </Button>
//                </Form.Item>

//                {/* Link to Login */}
//                <Form.Item>
//                  <Link to="/login">
//                    <Button size="large" className="btn">
//                      Sign In
//                    </Button>
//                  </Link>
//                </Form.Item>
//              </Form>
//            </Col>
//            {/* images */}
//            <Col xs={0} sm={24} md={10} lg={12}>
//              <img src={registerImage} className='auth-image' />
//            </Col>
//          </Row>
//        </Card>
//      </div>
//    );
//  };

//  export default Register;





import React from 'react';
import { Card, Form, Typography, Input, Button, Row, Col, Alert, Spin } from 'antd';
import { Link } from 'react-router-dom';
import registerImage from '../assets/register.png';
import useSignup from '../Hooks/useSignup';

const Register = () => {
  const { loading, error, registerUser } = useSignup();

  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <div>
      <Card className="form-container">
        <Row justify="center" gutter={[16, 16]}>
          {/* form */}
          <Col xs={24} sm={20} md={16} lg={12}>
            <Typography.Title level={3} strong className="title">
              Create an account
            </Typography.Title>
            <Typography.Title type="secondary" level={5} strong className="title">
              Join for exclusive access!
            </Typography.Title>
            <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
              {/* Full Name */}
              <Form.Item
                className="name"
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter your Full Name" />
              </Form.Item>

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

              {/* Confirm Password */}
              <Form.Item
                className="name"
                label="Confirm Password"
                name="passwordConfirmation"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Re-enter your Password" />
              </Form.Item>

              {/* Error Message */}
              {error && (
                <Alert
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="alert"
                />
              )}

              {/* Submit Button */}
              <Form.Item>
                <Button type={loading ? '' : 'primary'} htmlType="submit" size="large" className="btn">
                  {loading ? <Spin /> : 'Create Account'}
                </Button>
              </Form.Item>

              {/* Link to Login */}
              <Form.Item>
                <Link to="/login">
                  <Button size="large" className="btn">
                    Sign In
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Col>

          {/* images */}
          <Col xs={0} sm={24} md={10} lg={12}>
            <img src={registerImage} alt="Register" className='auth-image' />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Register;





