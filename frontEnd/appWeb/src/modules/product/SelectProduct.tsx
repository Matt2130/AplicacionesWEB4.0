import React from 'react';
import { Button, Form, Select, Space } from 'antd';

const { Option } = Select;

const SelectProducts: React.FC = () => {
  const [form] = Form.useForm();

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const onFill = () => {
    form.setFieldsValue({
      url: '',
    });
  };

  return (
    <Form form={form}>
      <Form.Item name="product">
        <Select
          showSearch
          placeholder="Select a product"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
        >
          <Option value="Telefonos">Samsung</Option>
          <Option value="Monitores">Asus</Option>
          <Option value="Consolas">Xbox</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onFill}>
            Fill
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default SelectProducts;