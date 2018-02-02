const env='pro'

const agree=env==='dev'?'http://192.168.5.2:18080/':'http://wbiokr.duapp.com/';

export default {
  agree,
  
  login:`${agree}login`,

  regist:`${agree}regist`,
  
  investing:`${agree}investing`,

  invested:`${agree}invested`,
}
