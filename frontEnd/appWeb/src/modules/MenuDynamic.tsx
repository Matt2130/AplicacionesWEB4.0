// src/MenuDynamic.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { getUserRole, getAccessToken, logout } from "../utils/auth"; 
import { 
  DashboardOutlined, 
  UserAddOutlined, 
  LoginOutlined, 
  TeamOutlined, 
  SearchOutlined, 
  MenuFoldOutlined 
} from "@ant-design/icons"; 

const Icons: Record<string, any> = {
  "dashboard-icon": DashboardOutlined,
  "user-add-icon": UserAddOutlined,
  "login-icon": LoginOutlined,
  "team-icon": TeamOutlined, 
  "search-icon": SearchOutlined, 
  "menu-fold-icon": MenuFoldOutlined 
};

function MenuComponent() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = getUserRole();
  const accessToken = getAccessToken();

  useEffect(() => {
    const fetchMenu = async () => {
      console.log("MenuComponent - Token from localStorage:", accessToken ? "Exist" : "Not Exist");
      console.log("MenuComponent - Role from localStorage:", userRole);

      if (!userRole || !accessToken) {
        console.warn("MenuComponent - No role or token found, not fetching menu.");
        setMenuItems([]); 
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/auth/getMenu/${userRole}`, {
          headers: { 
            "Authorization": `Bearer ${accessToken}` 
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("MenuComponent - Error fetching menu:", errorData.message || response.statusText);
          if (response.status === 401 || response.status === 403) {
            logout(); 
            navigate('/login'); 
          }
          setMenuItems([]); 
          return;
        }

        const data = await response.json();
        console.log("MenuComponent - Data received from menu API:", data);
        setMenuItems(data.menus || []);
      } catch (error) {
        console.error("MenuComponent - Error fetching menu (network/parsing):", error);
        setMenuItems([]); 
      }
    };

    fetchMenu();
  }, [userRole, accessToken]); 

  const renderMenu = () => {
    return menuItems.map((item) => {
      const IconComponent = Icons[item.icon];
      console.log("MenuComponent - Rendering menu item with key:", item.path, "label:", item.label);
      return {
        key: item.path,
        icon: IconComponent ? <IconComponent /> : null,
        label: item.label,
      };
    });
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]} 
      onClick={({ key }) => navigate(key)} 
      items={renderMenu()} 
    />
  );
}

export default MenuComponent;