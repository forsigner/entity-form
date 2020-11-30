import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Basic } from './components/Basic';
import { CustomLayout } from './components/CustomLayout';
import { CustomValidateDecorator } from './components/CustomValidateDecorator';
import { AsyncValidate } from './components/AsyncValidate';

import { registerAll } from './entity-form-antd'

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

registerAll();

const App = () => {
  return (
    <div style={{ padding: '40px' }}>
      <Basic></Basic>
      {/* <CustomLayout></CustomLayout> */}
      {/* <AsyncValidate></AsyncValidate> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
