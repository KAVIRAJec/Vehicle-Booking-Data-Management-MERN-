import React from 'react'
import { Card,Flex,Typography,Form,Input,Button,Alert,Spin } from 'antd'
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { error,loading, loginUser } = useLogin();
  const handleLogin = async (values) => {
    await loginUser(values);
  }
  return (
    <Card className='form-container'>
       <Flex>
        {/* form */}
        <Flex vertical flex={1}>
            <Typography.Title level={3} strong className='title'>
                Sign In
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan">
                Unlock your World!
            </Typography.Text>
            <Form layout='vertical' onFinish={handleLogin} autoComplete="off">
              <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                required: true,
                message: 'Please input your Email',
              },
              {
                type: 'email',
                message: 'The input is not valid Email',
              },
              ]}
              >
                <Input size="large" placeholder="Enter your Email" />
              </Form.Item>
              <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                required: true,
                message: 'please input your password',
              },
              ]}
              >
                <Input.Password size="large" placeholder="Enter your password" />
              </Form.Item>

              {error && (
                <Alert 
                description={error} 
                type="error" 
                showIcon 
                closable 
                className="alert"
                /> 
              )}
              <Form.Item>
                <Button
                type={`${loading ? '' : 'primary'}`}
                htmlType="submit"
                size="large"
                className="btn"
                >
                  {loading ? <Spin /> : 'Sign in'}
                </Button>
              </Form.Item>
              <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <GoogleLogin size="large" className="btn"
                onSuccess={credentialResponse => {
                  const credentialResponseDecoded = jwtDecode(
                    credentialResponse.credential
                  )
                console.log(credentialResponseDecoded);
                handleLogin({email: credentialResponseDecoded.email, password: "default"});
              }}
                onError={() => {
                console.log('Login Failed');
              }}
              />
              </div>
              </Form.Item>
              <Form.Item>
              <Link to="/">
                <Button size="large" className="btn">
                  Create an Account
                </Button>
              </Link>
              </Form.Item>
            </Form>
        </Flex>

        {/* image */}
        <Flex>

        </Flex>
       </Flex>
    </Card>
  )
}

export default Login
