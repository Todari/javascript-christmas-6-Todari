const REGEXP = Object.freeze({
  date: /^\d*$/,
  menus: /^([ㄱ-ㅎ가-힣]+[-]{1}\d{1,2}[,]{1})*[ㄱ-ㅎ가-힣]+[-]{1}\d{1,2}$/,
});

export default REGEXP;
