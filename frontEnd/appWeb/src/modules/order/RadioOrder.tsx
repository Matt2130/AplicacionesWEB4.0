import React from 'react';
import { Flex, Radio } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

const options: CheckboxGroupProps<string>['options'] = [
  { label: 'Samsung', value: 'Telefonos' },
  { label: 'Asus', value: 'Monitores' },
  { label: 'Xbox', value: 'Consolas' },
];

const RadioOrder: React.FC = () => (
  <Flex vertical gap="middle">
    <Radio.Group block options={options} defaultValue="Telefonos" />
    <Radio.Group
      block
      options={options}
      defaultValue="Monitores"
      optionType="button"
      buttonStyle="solid"
    />
    <Radio.Group block options={options} defaultValue="Consolas" optionType="button" />
  </Flex>
);

export default RadioOrder;