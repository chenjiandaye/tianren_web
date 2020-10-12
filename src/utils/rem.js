function setRem() {
    // 实际设备页面宽度和设计稿的比值
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const designRatio = 1920 / 1080;
    const realRatio = htmlWidth / htmlHeight;
  
    let baseSize = 192;
    let scale = htmlWidth / 1920;
    document.documentElement.style.fontSize = (baseSize * scale) + 'px';
  
    // 存在宽度够了，高度不够的情况
    if (realRatio > designRatio) {
      document.documentElement.style.fontSize = (baseSize * scale) * (designRatio / realRatio) + 'px'
    }
  }
  
  setRem();
  
  window.addEventListener('resize', () => {
    setRem();
  });