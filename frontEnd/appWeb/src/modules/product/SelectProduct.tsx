import React from 'react';
import { Select } from 'antd';

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

const SelectProducts: React.FC = () => (
  <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={[
      {
        value: 'Telefonos',
        label: 'Samsung',
      },
      {
        value: 'Monitores',
        label: 'Asus',
      },
      {
        value: 'Consolas',
        label: 'Xbox',
      },
    ]}
  />
);

export default SelectProducts;