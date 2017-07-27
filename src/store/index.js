import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';
import map from 'lodash/map';
import { database } from '@/services/firebase';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER, ALL_POSTS } from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    posts: [],
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    [SET_CURRENT_USER](state, payload) {
      state.currentUser = payload;
    },
    [ALL_POSTS](state, payload) {
      state.posts = payload;
    },
    [REMOVE_CURRENT_USER](state, payload) {
      state.currentUser = payload;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {
    fetchPosts({ commit }) {
      localforage.getItem('posts')
        .then((stalePosts) => {
          if (stalePosts) {
            commit(ALL_POSTS, stalePosts);
          }
          const postRef = database.ref('/posts');
          postRef.on('value', (snapshot) => {
            const postsObj = snapshot.val();
            // this.$log(postsObj);
            const freshPosts = map(postsObj, (post, postId) => {
              const postWithPostId = post;
              postWithPostId.postId = postId;
              return postWithPostId;
            }).reverse().slice();
            commit(ALL_POSTS, freshPosts);
            localforage.setItem('posts', freshPosts);
          });
        });
    },
  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    },
  },
});
