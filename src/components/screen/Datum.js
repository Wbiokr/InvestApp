import React from 'react';

import Login from './Datum/Login';
import About from './Datum/About';

let Index=Login;

if(localStorage&&localStorage.wbiokr&&JSON.parse(localStorage.wbiokr).isLogin){
  Index=About;
};

export default Index;