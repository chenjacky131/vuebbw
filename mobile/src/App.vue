<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
(function () {
  //  响应式代码
  /*
    sass里面设置转换函数$px为设计图里面的尺寸
    @function p2r($px)
    @return $px/100 + rem
    //  const pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1; 设置完initial后好像不需要考虑pixelRatio的值
  */
  window.addEventListener('resize', function () {
    setHtmlFontSize()
  }, false)
  function setHtmlFontSize () {
    const psdWidth = 375 //  设计图尺寸
    let clientWidth = document.documentElement.clientWidth || window.innerWidth
    // 限制在320和640宽度的设备之间
    if (clientWidth < 320) {
      clientWidth = 320
    } else if (clientWidth > 640) {
      clientWidth = 640
    }
    document.querySelector('html').style.fontSize = clientWidth / psdWidth * 100 + 'px'// 样式里面的rem单位设置需要除以100是因为chrome字体不能小于6px，为了兼容这个。
  }
  setHtmlFontSize()
}())
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: p2r(30);
  font-size: p2r(40);
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
