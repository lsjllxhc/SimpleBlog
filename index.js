// 右上角菜单按钮与抽屉功能
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menuBtn');
  const sideDrawer = document.getElementById('sideDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    sideDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    sideDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  menuBtn.addEventListener('click', openDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  // ESC键关闭
  document.addEventListener('keydown', function(e) {
    if ((e.key === "Escape" || e.key === "Esc") && sideDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });
});