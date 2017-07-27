<template>
  <div class="row posts">
    <post 
      v-for="post in posts"
      :key="post.key"
     :post="post"
    ></post>
  </div>
</template>

<script>
import Post from '@/components/Post';
import { auth } from '@/services/firebase';

export default {
  data() {
    return {
      auth,
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  components: {
    Post,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
 @media(min-width: 40rem) {
   .posts {
      flex-direction: column !important;
      width: 60%;
      margin: 0 auto;
    }
 }
</style>
