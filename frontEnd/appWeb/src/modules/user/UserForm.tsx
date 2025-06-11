import React from 'react';
import { Button, Form, Input } from 'antd';

function UseForm() {
  const [form] = Form.useForm();
  const title = 'Crear Usuario';

  const handleSubmit = () => {
    const values = form.getFieldsValue(); // obtener todos los datos del JSON
    console.log('Todos los datos del formulario:', values);
  };

  return (
    <div>
      <h1>{title}</h1>

      <Form
        name="layout-multiple"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
      >
        <Form.Item label="Horizontal" name="horizontal" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Vertical" name="vertical" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Obtener datos
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UseForm;