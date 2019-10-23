<template>
  <div class="header header-fixed" style="display: block;" current-url="@@dataUrl">
    <div class="content w960">
      <div class="logo">
        <a href="/home/index.html" class="logo-main">
          <img src="https://static.shenzhoubb.com/images/v2/logo1.png" alt />
        </a>
      </div>
      <div data-url="main" class="main_link">
        <a href="/home/index.html">首页</a>
      </div>
      <div id="order" class="main_link" data-url="order-manager">订单管理</div>
      <div data-url="requirement" class="main_link">
        <a href="/home/requirement/list.html">需求大厅</a>
      </div>
      <div class="main_link">
        <a href="https://c.shenzhoubb.com/">邦社区</a>
      </div>
      <div data-url="aboutUs" class="main_link">
        <a href="/home/AboutUs.html">联系我们</a>
      </div>
      <div class="header-main">
        <ul class="ul2">
          <li class="phone">
            <i class="phone_icon"></i>
            <span>400-676-3988</span>
          </li>
          <li class="zhuce" data-url="register.html">
            <a href="javascript:;" class="reg_a">注册</a>
          </li>
          <li class="quit">
            <a href="javascript:;">退出</a>
          </li>
          <li class="line zhuce">
            <span></span>
          </li>
          <li class="zhuce" data-url="login.html">
            <a href="javascript:;" class="login_a">登录</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted (){
      console.log($nuxt.$route.name)
  }
};
</script>
