import React, { useEffect, useState } from 'react';
import { Input, Space, Table, Tag } from 'antd'; 

const { Search } = Input;
const { Column } = Table;

interface ProductData {
  key: string;
  name: string;
  price: number;
  qty: number; 
  status: boolean; 
  description: string;
  quantity: number; 
  createDate: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]); 
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>(''); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:3000/api/auth/getAllProducts", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener productos');
        }

        const data = await response.json();
        const formattedProducts = (data.productList || []).map((product: any) => ({
          key: product._id, 
          name: product.name,
          price: product.price,
          qty: product.qty,
          status: product.status,
          description: product.description,
          quantity: product.quantity,
          createDate: new Date(product.createDate).toLocaleString() 
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts); 
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const handleSearch = (value: string) => {
    const searchValue = value.trim().toLowerCase();
    setSearchText(searchValue); 

    if (searchValue === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue) ||
          product.description.toLowerCase().includes(searchValue)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div style={{ padding: '24px' }}> 
      <h1>Gestión de Productos</h1> 
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar producto por nombre o descripción"
          onSearch={handleSearch} 
          onChange={(e) => handleSearch(e.target.value)} 
          value={searchText} 
          allowClear 
          enterButton="Buscar"
          style={{ width: 350 }}
        />
      </Space>

      <Table<ProductData>
        dataSource={filteredProducts}
        rowKey="key"
        pagination={{ pageSize: 5 }} 
        loading={loading} 
        bordered 
      >
        <Column title="Nombre" dataIndex="name" key="name" />
        <Column title="Precio" dataIndex="price" key="price"
            render={(price: number) => `$${price.toFixed(2)}`}
        />
        <Column title="Estado" dataIndex="status" key="status"
          render={(status: boolean) => (
            <Tag color={status ? "green" : "volcano"}>{status ? "Disponible" : "No disponible"}</Tag>
          )}
        />
        <Column title="Descripción" dataIndex="description" key="description" />
        <Column title="Cantidad Vendida" dataIndex="quantity" key="quantity" />
        <Column title="Fecha de Registro" dataIndex="createDate" key="createDate" />
      </Table>
    </div>
  );
};

export default ProductTable;