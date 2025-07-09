// LoginForm.tsx (Sin cambios, ya está correcto)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormData) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en login');
      }

      if (!data.accessToken || !data.user) {
        throw new Error("Respuesta inválida del servidor");
      }

      const normalizedUser = {
        ...data.user,
        roles: data.user.roles.map((role: any) => ({
          type: role.type,
          name: role.name
        }))
      };

      // Guarda en localStorage
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      // Dispara un evento 'storage' para que App.tsx (y otros componentes) reaccionen
      window.dispatchEvent(new Event('storage'));

      // Redirigir al dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error en Login:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<LoginFormData>) => {
    console.log('Failed validation:', errorInfo);
    setError('Por favor, completa todos los campos.');
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={styles.form}
        >
          <Form.Item
            label={<label style={styles.label}>Usuario:</label>}
            name="username"
            rules={[{ required: true, message: '¡Por favor ingresa tu usuario!' }]}
            style={styles.inputGroup}
          >
            <Input style={styles.input} />
          </Form.Item>

          <Form.Item
            label={<label style={styles.label}>Contraseña:</label>}
            name="password"
            rules={[{ required: true, message: '¡Por favor ingresa tu contraseña!' }]}
            style={styles.inputGroup}
          >
            <Input.Password style={styles.input} />
          </Form.Item>

          {error && <p style={styles.errorText}>{error}</p>}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.button}>
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  loginBox: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '30px',
    color: '#333',
    fontSize: '28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px 10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '-10px',
    marginBottom: '10px',
  },
};

export default LoginForm;