const REGEXP = Object.freeze({
  date: /^\d*$/,
  menus:
    /^([ㄱ-ㅎ가-힣]+-[1-9]{1}([0-9]{1})?)(,[ㄱ-ㅎ가-힣]+-[1-9]{1}([0-9]{1})?)*$/,
});

export default REGEXP;
