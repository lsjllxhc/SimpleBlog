// 控制面板页 panel.html JS
// --- 权限检查 ---
if(!sessionStorage.getItem('adminLoggedIn')) location.href='login.html';

// --- 初始化面板各项数据 ---
function updatePanel() {
  document.getElementById('adminNameInput').value = localStorage.getItem('adminName') || '我的名字';
  document.getElementById('adminDescInput').value = localStorage.getItem('adminDesc') || '一句简短的自我介绍，例如：Android开发者｜热爱设计与技术';
  document.getElementById('adminGithubLinkInput').value = localStorage.getItem('adminGithubLink') || '';
  document.getElementById('adminMenuTitleInput').value = localStorage.getItem('adminMenuTitle') || '我的主页';
  document.getElementById('adminThemeColorInput').value = localStorage.getItem('adminThemeColor') || '#3F51B5';
  document.getElementById('adminNewPasswordInput').value = '';
  document.getElementById('avatarInput').value = '';
  document.getElementById('adminAvatarPreview').src = localStorage.getItem('adminAvatar') || 'https://avatars.githubusercontent.com/u/1?v=4';
  document.documentElement.style.setProperty('--primary', localStorage.getItem('adminThemeColor') || '#3F51B5');
}
window.onload = updatePanel;

// --- 保存 ---
document.getElementById('adminSaveBtn').onclick = function () {
  localStorage.setItem('adminAvatar', document.getElementById('adminAvatarPreview').src);
  localStorage.setItem('adminName', document.getElementById('adminNameInput').value.trim() || '我的名字');
  localStorage.setItem('adminDesc', document.getElementById('adminDescInput').value.trim() || '');
  localStorage.setItem('adminGithubLink', document.getElementById('adminGithubLinkInput').value.trim() || '');
  localStorage.setItem('adminMenuTitle', document.getElementById('adminMenuTitleInput').value.trim() || '我的主页');
  localStorage.setItem('adminThemeColor', document.getElementById('adminThemeColorInput').value || '#3F51B5');
  const newPwd = document.getElementById('adminNewPasswordInput').value;
  if (newPwd) {
    localStorage.setItem('adminPassword', newPwd);
    alert('新密码已设置！');
    document.getElementById('adminNewPasswordInput').value = '';
  }
  alert('保存成功！');
};

// --- 主题主色“重ElementById('resetThemeColorBtn').onclick = function () {
  var defaultColor = '#3F51B5';
  var input = document.getElementById('adminThemeColorInput');
  input.value = defaultColor;
  localStorage.setItem('adminThemeColor', defaultColor);
  document.documentElement.style.setProperty('--primary', defaultColor);
};

// --- 头像裁剪功能（Cropper.js） ---
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
rotateRightBtn) cropper.rotate(90);
};
cropConfirmBtn.onclick = function () {
  if (!cropper) return;
  const canvas = cropper.getCroppedCanvas({
    width: 200, height: 200, imageSmoothingQuality: 'high'
  });
  avatarPreview.src = canvas.toDataURL('image/png');
  cropper.destroy();
  cropper = null;
  cropModal.style.display = 'none';
};
cropCancelBtn.onclick = function () {
  if (cropper) { cropper.destroy(); cropper = null; }
  cropModal.style.display = 'none';
};