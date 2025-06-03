// ======== 抽屉菜单控制 ========
const menuBtn = document.getElementById('menuBtn');
const sideDrawer = document.getElementById('sideDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
menuBtn.onclick = function () {
  sideDrawer.classList.add('open');
  drawerOverlay.classList.add('open');
};
drawerOverlay.onclick = closeDrawer;
function closeDrawer() {
  sideDrawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
}

// ======== 管理员登录弹窗 ========
const adminEntryBtn = document.getElementById('adminEntryBtn');
const adminLoginModal = document.getElementById('adminLoginModal');
const adminPasswordInput = document.getElementById('adminPassword');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminLoginError = document.getElementById('adminLoginError');
const adminPanelModal = document.getElementById('adminPanelModal');

function getAdminPassword() {
  return localStorage.getItem('adminPassword') || 'admin';
}
adminEntryBtn.onclick = function () {
  closeDrawer();
  adminLoginModal.classList.add('active');
  adminPasswordInput.value = '';
  adminLoginError.textContent = '';
  setTimeout(() => adminPasswordInput.focus(), 100);
};
adminLoginModal.onclick = function (e) {
  if (e.target === adminLoginModal) adminLoginModal.classList.remove('active');
};
adminLoginBtn.onclick = function () {
  const inputPwd = adminPasswordInput.value;
  if (inputPwd === getAdminPassword()) {
    adminLoginModal.classList.remove('active');
    showAdminPanel();
  } else {
    adminLoginError.textContent = '密码错误';
  }
};
adminPasswordInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') adminLoginBtn.click();
});

// ======== 控制面板弹窗逻辑 ========
function showAdminPanel() {
  document.getElementById('adminNameInput').value = localStorage.getItem('adminName') || '我的名字';
  document.getElementById('adminDescInput').value = localStorage.getItem('adminDesc') || '一句简短的自我介绍，例如：Android开发者｜热爱设计与技术';
  document.getElementById('adminMenuTitleInput').value = localStorage.getItem('adminMenuTitle') || '我的主页';
  document.getElementById('adminThemeColorInput').value = localStorage.getItem('adminThemeColor') || '#3F51B5';
  document.getElementById('adminNewPasswordInput').value = '';
  document.getElementById('avatarInput').value = '';
  const avatar = localStorage.getItem('adminAvatar') || 'https://avatars.githubusercontent.com/u/1?v=4';
  document.getElementById('adminAvatarPreview').src = avatar;
  adminPanelModal.classList.add('active');
}
adminPanelModal.onclick = function (e) {
  if (e.target === adminPanelModal) adminPanelModal.classList.remove('active');
};
document.getElementById('adminLogoutBtn').onclick = function () {
  adminPanelModal.classList.remove('active');
};

// ======== 头像裁剪功能（Cropper.js） ========
let cropper = null;
const avatarInput = document.getElementById('avatarInput');
const cropModal = document.getElementById('avatarCropModal');
const cropperImage = document.getElementById('cropperImage');
const cropConfirmBtn = document.getElementById('cropConfirmBtn');
const cropCancelBtn = document.getElementById('cropCancelBtn');
const rotateLeftBtn = document.getElementById('rotateLeftBtn');
const rotateRightBtn = document.getElementById('rotateRightBtn');
const avatarPreview = document.getElementById('adminAvatarPreview');

avatarInput.onchange = function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (evt) {
    cropperImage.src = evt.target.result;
    cropModal.style.display = 'flex';
    if (cropper) { cropper.destroy(); }
    cropperImage.onload = function () {
      cropper = new Cropper(cropperImage, {
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        autoCropArea: 1,
      });
    }
  };
  reader.readAsDataURL(file);
};
rotateLeftBtn.onclick = function () {
  if (cropper) cropper.rotate(-90);
};
rotateRightBtn.onclick = function () {
  if (cropper) cropper.rotate(90);
};
cropConfirmBtn.onclick = function () {
  if (!cropper) return;
  const canvas = cropper.getCroppedCanvas({
    width: 200,
    height: 200,
    imageSmoothingQuality: 'high'
  });
  avatarPreview.src = canvas.toDataURL('image/png');
  cropper.destroy();
  cropper = null;
  cropModal.style.display = 'none';
};
cropCancelBtn.onclick = function () {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  cropModal.style.display = 'none';
};

// ======== 保存按钮逻辑 ========
document.getElementById('adminSaveBtn').onclick = function () {
  // 头像
  const avatar = document.getElementById('adminAvatarPreview').src;
  localStorage.setItem('adminAvatar', avatar);
  // 名字
  const name = document.getElementById('adminNameInput').value.trim() || '我的名字';
  localStorage.setItem('adminName', name);
  // 简介
  const desc = document.getElementById('adminDescInput').value.trim() || '';
  localStorage.setItem('adminDesc', desc);
  // 菜单栏标题
  const menuTitle = document.getElementById('adminMenuTitleInput').value.trim() || '我的主页';
  localStorage.setItem('adminMenuTitle', menuTitle);
  // 主题色
  const themeColor = document.getElementById('adminThemeColorInput').value || '#3F51B5';
  localStorage.setItem('adminThemeColor', themeColor);
  // 新密码
  const newPwd = document.getElementById('adminNewPasswordInput').value;
  if (newPwd) {
    localStorage.setItem('adminPassword', newPwd);
    alert('新密码已设置！');
    document.getElementById('adminNewPasswordInput').value = '';
  }
  updatePageInfo();
  adminPanelModal.classList.remove('active');
};

// ======== 主题主色“重置”按钮 ========
document.getElementById('resetThemeColorBtn').onclick = function () {
  var defaultColor = '#3F51B5';
  var input = document.getElementById('adminThemeColorInput');
  input.value = defaultColor;
  localStorage.setItem('adminThemeColor', defaultColor);
  document.documentElement.style.setProperty('--primary', defaultColor);
};

// ======== 页面信息实时刷新 ========
function updatePageInfo() {
  const avatar = localStorage.getItem('adminAvatar') || 'https://avatars.githubusercontent.com/u/1?v=4';
  document.querySelector('.avatar').src = avatar;
  // 头像预览同步
  if (document.getElementById('adminAvatarPreview')) {
    document.getElementById('adminAvatarPreview').src = avatar;
  }
  document.querySelector('h1').textContent = localStorage.getItem('adminName') || '我的名字';
  document.querySelector('.subtitle').textContent = localStorage.getItem('adminDesc') || '一句简短的自我介绍，例如：Android开发者｜热爱设计与技术';
  document.querySelector('.topbar-title').textContent = localStorage.getItem('adminMenuTitle') || '我的主页';
  document.documentElement.style.setProperty('--primary', localStorage.getItem('adminThemeColor') || '#3F51B5');
}
window.addEventListener('DOMContentLoaded', updatePageInfo);

// ======== （可选）加载动画自动淡出 & 主页显示 ========
window.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    if (document.getElementById('loading')) {
      document.getElementById('loading').classList.add('loaded');
      setTimeout(function () {
        document.getElementById('loading').classList.add('fade-out');
        setTimeout(function () {
          document.getElementById('loading').style.display = 'none';
          document.querySelector('.container').classList.add('show');
        }, 800);
      }, 800);
    }
  }, 600);
});