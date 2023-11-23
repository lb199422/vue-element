export function getTokenAUTH() {
  return localStorage.getItem('TokenAUTH');
}

export function removeTokenAUTH() {
  localStorage.removeItem('TokenAUTH');
}

export function setTokenAUTH(data) {
  localStorage.setItem('TokenAUth', data);
}
// 扩展运算符
