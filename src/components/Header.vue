<template>
  <header class="main_title">
    <div class="logo">
      <a>
        <img src="@/assets/img/img_index/logo.png" alt=""/>
      </a>
    </div>
    <div class="logo_title"></div>
    <div class="user_function">
        <span class="user_icon">
            <img src="@/assets/img/img_index/none.png" class="img-circle" title="点击登录" alt=""/>
        </span>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped>
.main_title {
  background-color: rgb(128, 30, 31);
  height: 80px;

  .logo {
    padding-left: 30px;
    padding-top: 10px;
    float: left;

    img {
      width: 80%;
    }
  }

  .logo_title {
    float: left;
    color: white;
    font-size: 30px;
    padding-top: 17px;
  }

  .user_function {
    float: right;
    padding-top: 5px;
    padding-right: 50px;

    .img-circle {
      cursor: pointer;
    }
  }
}

</style>
