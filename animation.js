// animation.js
window.addEventListener('load', function () {
  const MIN_LOADING_TIME = 1500; // 至少转1.5秒
  const ANIMATION_STAGE1_TIME = 1100; // 圆环-实心圆-勾-文字阶段
  const ANIMATION_STAGE2_TIME = 950; // loading蒙版淡出
  const loading = document.getElementById('loading');
  const startTime = performance.timing.navigationStart ? performance.timing.navigationStart : Date.now();

  function showMain() {
    loading.style.display = 'none';
    document.querySelector('.container').classList.add('show');
  }

  // spinner转动至少MIN_LOADING_TIME
  const elapsed = Date.now() - startTime;
  const wait = Math.max(0, MIN_LOADING_TIME - elapsed);

  setTimeout(() => {
    // 圆环到实心圆+勾+文字
    loading.classList.add('loaded');
    setTimeout(() => {
      loading.classList.add('fade-out');
      setTimeout(showMain, ANIMATION_STAGE2_TIME);
    }, ANIMATION_STAGE1_TIME);
  }, wait);
});