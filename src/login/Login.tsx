import { Button, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './login.css'
import { useState } from 'react'
import credentials from './credentials.json'

interface LoginForm {
  email: string
  password: string
  status: 'success' | 'error' | ''
}

function Login() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    status: '',
  })

  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  }

  return (
    <form
      className="login-container"
      onSubmit={(e) => {
        e.preventDefault()

        // validate password against hardcoded json
        if (
          form.email === credentials.email &&
          form.password === credentials.password
        ) {
          setForm({ ...form, status: 'success' })
          localStorage.setItem('loggedIn', 'true')
        } else {
          setForm({ ...form, status: 'error' })
          localStorage.setItem('loggedIn', 'false')
        }
      }}
    >
      <Input
        size="large"
        placeholder="Email Address"
        status={
          form.email.length > 0 && !isValidEmail(form.email) ? 'warning' : ''
        }
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        prefix={<UserOutlined />}
      />
      <Input.Password
        size="large"
        placeholder="Password"
        status={form.status === 'error' ? 'error' : ''}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        prefix={<LockOutlined />}
      />
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        danger={form.status === 'error'}
        disabled={!isValidEmail(form.email)}
      >
        Login
      </Button>
    </form>
  )
}

export default Login
