export const toDate=(stamp)=>{
    const y = new Date(stamp).getFullYear();
    const m = ('0' + String(new Date(stamp).getMonth() + 1)).slice(-2);
    const d = ('0' + String(new Date(stamp).getDate())).slice(-2);
    // const h=new Date(stamp).getHours();
    // const min=new Date(stamp).getMinutes();
    return `${y}-${m}-${d}`
  }
