<template>
  <div class="login-page">
    <div class="logo">
      <img src="../assets/logos/main2.svg" alt="">
    </div>
    <button @click="() => auth.signInWithPopup(googleAuthProvider)">Login</button>
  </div>
</template>

<script>
import { auth, googleAuthProvider } from '@/services/firebase';

export default {
  data() {
    return {
      auth,
      googleAuthProvider,
    };
  },
  mounted() {
    if (auth.currentUser) {
      this.$router.push('/');
    }
  },
};
</script>


<style lang="scss" scoped>
  div.login-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 150px;
  }
  div.logo {
    img {
      width: 250px;
      height: auto;
    }
  }
  button {
    background: #115688;
    border: 1px solid darken(#115688, 5);
    margin-top: 25px;
  }
</style>

