const env='dev'

const agree=env==='dev'?'http://192.168.1.2:18080/':'http://wbiokr.duapp.com/';

export default {
  agree,
  
  login:`${agree}login`,

  regist:`${agree}regist`,
  
  record:`${agree}invest/record`,

  // invested:`${agree}invest/`,

  edit:`${agree}invest/edit`,
}
