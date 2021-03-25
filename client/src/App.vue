<template>
<div id="app">
  <router-view />
</div>
</template>

<style lang="scss">
#app {
  font-family: FZSanBTJW_Zhun!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  overflow: auto;
}

.search_wrap {
  display: flex;
  padding: 12px 12px 0 12px;
}

::-webkit-scrollbar {
  /*滚动条整体部分，其中的属性有width,height,background,border（就和一个块级元素一样）等。*/
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-button {
  /*滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
  display: none;
}

::-webkit-scrollbar-track {
  /*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
  display: none;
}

::-webkit-scrollbar-track-piece {
  /*内层轨道，滚动条中间部分（除去）。*/
  background: rgb(240, 240, 240);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面可以拖动的那部分*/
  background: rgb(200, 200, 200);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  /*滚动条里面可以拖动的那部分*/
  background: rgb(180, 180, 180);
}

::-webkit-scrollbar-corner {
  /*边角*/
  background: rgb(200, 200, 200);
}

::-webkit-scrollbar-resizer {
  /*定义右下角拖动块的样式*/
  background: rgb(200, 200, 200);
}
</style>
