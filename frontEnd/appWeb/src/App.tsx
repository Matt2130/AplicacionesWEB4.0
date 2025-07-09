// src/App.tsx
import { BrowserRouter, Navigate, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Menu, Button, theme, Space, Dropdown } from 'antd'; 
import { LogoutOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'; 

import LoginForm from './modules/login/LoginForm';
import Dashboard from './modules/dashboard/Dashboard';
import MenuComponent from './modules/MenuDynamic'; 
import { getAccessToken, getCurrentUser, getUserRole, logout } from './utils/auth';
import routes from './core/menuRoutes'; 

const { Header, Sider, Content } = Layout;

const ProtectedLayout: React.FC = () => {
  const role = getUserRole();
  const currentUser = getCurrentUser(); 
  const navigate = useNavigate(); 

  if (!role || !currentUser) {
    logout();
    return <Navigate to="/login" replace />;
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userMenu = (
    <Menu
      onClick={({ key }) => {
        if (key === 'logout') {
          logout();
          navigate('/login'); 
        }
      }}
      items={[
        {
          key: 'username',
          label: (
            <span style={{ fontWeight: 'bold' }}>
              <UserOutlined style={{ marginRight: '8px' }} />
              {currentUser?.username || 'Usuario'}
            </span>
          ),
          disabled: true, 
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          label: 'Cerrar Sesión',
          icon: <LogoutOutlined />,
          danger: true, 
        },
      ]}
    />
  );


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={220}
        theme="dark"
        breakpoint="lg" 
        collapsedWidth="0"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h3
            style={{ color: '#fff', fontSize: '18px', margin: 0, cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            Mi App
          </h3>
        </div>
        <MenuComponent /> 
      </Sider>

      <Layout style={{ marginLeft: 220 }}> 
        <Header
          style={{
            padding: '0 24px', 
            background: colorBgContainer, 
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(0,21,41,0.08)', 
            position: 'sticky', 
            top: 0,
            zIndex: 100, 
          }}
        >
          <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Bienvenido, {currentUser?.username || 'Usuario'}</h1>
          
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <Button type="text" style={{ color: '#333' }}>
              <Space>
                <UserOutlined />
                {currentUser?.username || 'Usuario'}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 64px - 48px)', 
            background: colorBgContainer,
            borderRadius: 8,
            overflowY: 'auto', 
          }}
        >
          <Outlet /> 
        </Content>
      </Layout>
    </Layout>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getAccessToken();
      const user = getCurrentUser();
      
      if (token && user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (token || user) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    checkAuth();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token" || event.key === "user" || !event.key) {
        console.log("App - Storage change detected, re-checking authentication.");
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); 

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', color: '#333', fontSize: '24px' }}>
        Cargando aplicación...
      </div>
    );
  }

  const currentUserRole = getUserRole();

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
        />
        
        {isAuthenticated ? (
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} /> 
            <Route path="dashboard" element={<Dashboard />} /> 

            {routes.map((route) => {
              const hasRequiredRole = route.role ? route.role.includes(currentUserRole!) : true;
              return hasRequiredRole ? (
                <Route key={route.path} path={route.path.substring(1)} element={route.element} /> 
              ) : null;
            })}
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;