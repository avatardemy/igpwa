<template>
  <div class="footer">
    <div class="home">
      <img src="../assets/icons/home.svg" alt=""> <span> Home</span>
    </div>
    <div class="upload">
      <img src="../assets/icons/instagram.svg" alt=""> <span> Upload</span>
      <form action="" class="upload-form">
        <input type="file" @change="$emit('upload', $event.target.files)">
      </form>
    </div>
    <div class="profile" @click="$emit('logout')">
      <img src="../assets/icons/profile.svg" alt=""> <span> You</span>
    </div>
  </div>
</template>

<script>
export default {
  app: 'app-footer',
};
</script>

<style lang="scss">
  $footer-bg: #25272B;
  .footer {
    display: flex;
    justify-content: space-between;
    background: $footer-bg;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .footer div {
    display: inline-flex;
    align-items: center;
    padding: 7px 15px;
    color: #fff;
    img {
      width: 40px;
      height: auto;
    }
    span {
      padding-left: 10px;
      display: none;
    }
    @media (min-width: 40.0rem) { 
      span {
        display: inline;
      }
    }
    &.upload {
      background: #115688;
    }
  }
  .upload-form {
    position: absolute;
    input {
      width: 50px;
      margin: -10px;
      opacity: 0;
    }
  }
</style>

