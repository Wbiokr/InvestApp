import {StackRouter} from 'react-navigation';

import Home from '../components/views/Home';

import Login from '../components/views/Login';

import Note from '../components/views/Note';

import Invest from '../components/views/Invest';

import Datum from '../components/views/Datum';

const routerConfig={
  Home:{
    screen:Home,
    path:'',
  },
  Login:{
    screen:Login,
    path:'/login',
  },
  Datum:{
    screen:Datum,
    path:'/datum',
  },
  Invest:{
    screen:Invest,
    path:'/invest',
  },
  Note:{
    screen:Note,
    path:'/note',
  }
};

export default StackRouter(routerConfig)