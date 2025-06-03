// 登录页 login.html JS
function getAdminPassword() {
  return localStorage.getItem('adminPassword') || 'admin';
}
document.getElementById('adminLoginBtn').onclick = function () {
  const inputPwd = document.getElementById('adminPassword').value;
  if (inputPwd === getAdminPassword()) {
    sessionStorage.setItem('adminLoggedIn', '1');
    location.href = "panel.html";
  } else {
    document.getElementById('adminLoginError').textContent = '密码错误';
  }
};
document.getElementById('adminPassword').addEventListener('keydown',function(e){
  if(e.key==="Enter") document.getElementById('adminLoginBtn').click();
});