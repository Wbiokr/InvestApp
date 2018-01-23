
// 公用文件请勿修改！！！！

// import {
//   global
// } from 'react-native';

const agree=getScheme();

export default{

    agree,//测试正式环境下通用url地址头部

    originPhp:agree+'wap.youdingkeji.com',//php域名

    originJava:agree+'api.youdingkeji.com',//java域名

    originWeb:agree+'web.youdingkeji.com',//web域名

    apiUrl:agree+'api.youdingkeji.com/yiding-rest/rest/activity/entry.json',//java活动接口

    activity:agree+'api.youdingkeji.com/yiding-rest/rest/message/getHistoryEvent.json',//活动列表

    notice:agree+'api.youdingkeji.com/yiding-rest/rest/message/noticeList.json',//公告列表	

    discovery:agree+'api.youdingkeji.com/yiding-rest/rest/message/getDiscoveryPageOther.json',//发现页其他	
    
    downUrl:agree+'web.youdingkeji.com/sms/download/link.html',//app下载链接

   
}

function getScheme(){
    return global.env==='development'?'https://t':'https://t';
}