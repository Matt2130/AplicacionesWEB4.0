import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginForm from './modules/login/LoginForm';
import Dashboard from './modules/dashboard/Dashboard';
import MenuComponent from '../src/modules/MenuDynamic'; 
import { getAccessToken, getCurrentUser, getUserRole, logout } from './utils/auth';
import routes from '../src/core/menuRoutes';
import { Outlet } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
  const role = getUserRole();
  if (!role) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <aside style={{ width: 220, background: '#001529', padding: '16px 0', boxShadow: '2px 0 6px rgba(0,0,0,0.2)' }}>
        <h3 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px', fontSize: '20px' }}>Mi App</h3>
        <MenuComponent />
      </aside>

      <main style={{ flexGrow: 1, padding: '24px', overflowY: 'auto' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Bienvenido, {getCurrentUser()?.username || 'Usuario'}</h1>
        
        <Outlet />

        <button 
          onClick={logout} 
          style={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Cerrar Sesión
        </button>
      </main>
    </div>
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
      if (event.key === "token" || event.key === "user" || !event.key) { // !event.key para cambios generales
        console.log("App - Storage change detected, re-checking authentication.");
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); // Se ejecuta una vez al montar

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#333', color: '#fff', fontSize: '24px' }}>Cargando aplicación...</div>;
  }

  // Obtenemos el rol del usuario para el mapeo de rutas protegidas
  const currentUserRole = getUserRole();

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
        />
        
        {isAuthenticated ? (
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {routes.map((route) => {
              const hasRequiredRole = route.role ? route.role.includes(currentUserRole!) : true;

              return hasRequiredRole ? (
                <Route key={route.path} path={route.path} element={route.element} />
              ) : null; // Si no tiene el rol, no renderiza la ruta
            })}

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;