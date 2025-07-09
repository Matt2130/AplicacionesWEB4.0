import React, { useEffect, useState } from 'react';
import { Input, Space, Table, Tag, Button, Modal, List } from 'antd'; 
import { EyeOutlined } from '@ant-design/icons'; 

const { Search } = Input;
const { Column } = Table;

interface Product {
  productId: string; 
  quantity: number;
  price: number;
}

interface OrderData {
  key: string;
  IDUser: string;
  status: string;
  statusSystem: string;
  subTotal: number;
  total: number;
  products: Product[];
  createDate: string;
}

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [searchText, setSearchText] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]); 

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); 
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch("http://localhost:3000/api/auth/getAllOrders", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener órdenes');
        }

        const data = await response.json();
        const formattedOrders = data.orderList.map((order: any) => ({
          key: order._id,
          IDUser: order.IDUser,
          status: order.status,
          statusSystem: order.statusSystem,
          subTotal: order.subTotal,
          total: order.total,
          products: order.products,
          createDate: new Date(order.createDate).toLocaleString()
        }));
        setOrders(formattedOrders);
        setFilteredOrders(formattedOrders);
      } catch (error) {
        console.error("Error al obtener órdenes:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.trim().toLowerCase();
    setSearchText(searchValue);

    if (searchValue === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.status.toLowerCase().includes(searchValue) || 
          order.statusSystem.toLowerCase().includes(searchValue) 
      );
      setFilteredOrders(filtered);
    }
  };

  // Functions for the Products Modal
  const showProductsModal = (products: Product[]) => {
    setSelectedProducts(products);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProducts([]); 
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Gestión de Órdenes</h1>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar por estado o estado del sistema" 
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} 
          value={searchText}
          allowClear
          enterButton="Buscar"
          style={{ width: 350 }} 
        />
      </Space>

      <Table<OrderData>
        dataSource={filteredOrders}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        loading={loading} // Show loading indicator
        bordered
      >
        <Column title="ID Usuario" dataIndex="IDUser" key="IDUser" />
        <Column title="Estado" dataIndex="status" key="status"
          render={(status: string) => (
            <Tag color={status === "Pendiente" ? "orange" : "green"}>{status}</Tag>
          )}
        />
        <Column title="Estado del Sistema" dataIndex="statusSystem" key="statusSystem"
          render={(statusSystem: string) => (
            <Tag color={statusSystem === "Activo" ? "geekblue" : "volcano"}>{statusSystem}</Tag>
          )}
        />
        <Column title="Subtotal" dataIndex="subTotal" key="subTotal" />
        <Column title="Total" dataIndex="total" key="total" />
        <Column title="Fecha de Creación" dataIndex="createDate" key="createDate" />
        <Column
          title="Productos"
          dataIndex="products"
          key="products"
          render={(products: Product[]) => (
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => showProductsModal(products)} // Clickable button
            >
              Ver ({products.length})
            </Button>
          )}
        />
        {/* You can add an Action column here if needed for editing/deleting orders */}
        {/* <Column
          title="Acciones"
          key="actions"
          render={(_: any, record: OrderData) => (
            <Space size="middle">
              <a>Editar</a>
              <a style={{ color: 'red' }}>Eliminar</a>
            </Space>
          )}
        /> */}
      </Table>

      {/* Modal to display product details */}
      <Modal
        title="Detalles de Productos"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Cerrar
          </Button>,
        ]}
      >
        <List
          itemLayout="horizontal"
          dataSource={selectedProducts}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`Producto ID: ${item.productId}`}
                description={`Cantidad: ${item.quantity}, Precio Unitario: $${item.price.toFixed(2)}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default OrderTable;