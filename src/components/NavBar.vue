<template>
  <div class="navbar">
    <div class="logo">
      <img src="../assets/logos/main.svg" alt="">
    </div>
  </div>
</template>

<style lang="scss">
  .navbar {
    display: flex;
    justify-content: space-around;
    background: #115688;
    padding: 15px 0px 10px;
    position: fixed;
    width: 100%;
    top: 0;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);
  }
  .logo {
    img {
      width: 110px;
      height: auto;
    }
  }
</style>
