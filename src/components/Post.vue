<template>
  <div class="post column">
    <div class="post__header">
      <img :src="post.photoURL" alt="">
      <div class="post__header-details">
        <div>{{post.displayName}}</div>
        <div>{{fromNow(post.created)}}</div>
      </div>
    </div>

    <div class="post__media">
      <img :data-src="transformImage(post)" alt="" class="cld-responsive">
    </div>

    
    <!--<div class="post__likes">
      <img src="../assets/icons/liked.svg" alt="Like"> <span> 547 likes</span>
    </div>-->
    <div class="post__content">
      <strong>{{post.displayName}}: </strong> {{post.caption}}.
    </div>
    <div class="post__footer">
      <!--<img src="../assets/icons/like.svg" alt="Like">
      <img src="../assets/icons/arrow.svg" alt="Open">-->
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: [
    'post',
  ],
  mounted() {
    this.$cl.responsive();
  },
  methods: {
    fromNow(time) {
      return moment(time).format('MMM Do YY');
    },
    transformImage(post) {
      this.$log(this.$cl.url(post.public_id, { width: 1000, flags: 'progressive', secure: true }));
      return this.$cl.url(post.public_id, { width: 1000, flags: 'progressive', secure: true });
    },
  },
};
</script>

<style lang="scss">
  $primary: #115688;
  .post {
    margin-top: 15px;
    @media(min-width: 40.0rem) {
      &:nth-child(1) {
        margin-top: 15px;
      }
    }
  }
  .post__header {
    display: flex;
    padding: 10px 15px;
    align-items: center;
    img {
      width: 50px;
      display: block;
      max-height: 50px;
      border-radius: 100%;
      height: auto;
    }
    .post__header-details {
      padding-left: 10px;
      div:nth-child(1) {
        color: $primary;
      };
      div:nth-child(2) {
        color: #AAAAAA;
      }
    }
  }

  .post__footer {
    padding: 7px 15px;
    border-bottom: 1px solid #E6E6E6;
    margin-bottom: 15px;
    img {
      width: 25px;
      height: auto;
      margin-right: 15px;
    }
  }

  .post__likes {
    padding: 0 15px;
    color: $primary;
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }

  .post__content {
    strong {
      color: $primary;
    }
    color: #555555;
    padding: 0 15px;
  }
</style>
