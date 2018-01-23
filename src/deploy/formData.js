//  默认导出ajax请求参数 格式为form data
 const formatParams=(data)=> {
  let arr = [];
  for (let name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  arr.push(("v=" + Math.random()).replace(".", ""));
  return arr.join("&");
};

export default formatParams ;