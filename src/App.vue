<template>
  <div id="app">
    <nav-bar v-if="$route.meta.showShell"></nav-bar>
    <main>
      <router-view></router-view>
    </main>
    <vodal :show="showModal" @hide="hideModal">
        <pulse-loader :loading="loading" :color="loadingColor" :size="loadingSize"></pulse-loader>
        <div class="img-to-upload"><img :src="fileToUpload" alt=""></div>
        <h4>Awesome Filters</h4>
        <div class="filters" v-for="i in Math.ceil(filters.length / 3)" :key="i">
          <div class="filter" v-for="filter in filters.slice((i - 1) * 3, i * 3)" :key="filter" @click="changeFilter(filter)">
            <img class="filter" :src="filter" alt="">
          </div>
        </div>
        <textarea rows="3" v-model="caption">Caption</textarea>
        <button class="choose-button" @click="handleUpload">Upload</button>
    </vodal>
    <app-footer v-if="$route.meta.showShell" @logout="logout" @upload="upload($event)"></app-footer>
  </div>
</template>

<script>
// import map from 'lodash/map';
import PulseLoader from 'vue-spinner/src/PulseLoader';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { SET_CURRENT_USER } from '@/store/types';
import { auth, database } from '@/services/firebase';

export default {
  name: 'app',
  data() {
    return {
      showModal: false,
      fileToUpload: null,
      filters: [],
      loading: false,
      loadingColor: '#115688',
      loadingSize: '20px',
      caption: '',
      postRef: database.ref('/posts'),
      currentUser: null,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit(SET_CURRENT_USER, user);
        this.currentUser = user;
        this.$router.push('/');

        // Fetch posts
        this.$store.dispatch('fetchPosts');
      }
    });
  },
  methods: {
    logout() {
      auth.signOut();
      this.$router.push('/login');
    },
    upload(files) {
      if (files.length < 1) return;
      this.showModal = true;
      this.loading = true;
      const tempURL = this.convertToDataURL(files[0]);
      this.vintegize(tempURL, {})
        .then((img) => {
          this.fileToUpload = img;
        });
      for (let i = 1; i <= 6; i += 1) {
        const contrast = 0.1 * i;
        const brigntness = 0.1 * i;
        const vignette = 0.2 * i;
        this.vintegize(tempURL, { contrast, brigntness, vignette })
          .then((img) => {
            this.filters.push(img);
            if (this.filters.length === 6) {
              this.loading = false;
            }
          });
      }
    },
    convertToDataURL(file) {
      return URL.createObjectURL(file);
    },
    changeFilter(filter) {
      this.fileToUpload = filter;
    },
    hideModal() {
      this.showModal = false;
      this.fileToUpload = null;
      this.filters = [];
      this.loading = false;
    },
    handleUpload() {
      if (!this.fileToUpload) return;
      this.loading = true;
      const blob = this.dataURItoBlob(this.fileToUpload);
      const formData = new FormData();
      formData.append('image', blob);
      formData.append('caption', this.caption);
      this.$axios.post('https://wt-nwambachristian-gmail_com-0.run.webtask.io/serverless/upload', formData)
        .then(res => this.persistWithFirebase(res.data))
        .catch(err => this.$log(err));
    },
    persistWithFirebase(data) {
      const dataWithUserAndTimePayload = Object.assign({}, data, {
        displayName: this.currentUser.displayName,
        photoURL: this.currentUser.photoURL,
        created: new Date(),
      });
      this.postRef.push(dataWithUserAndTimePayload);
      this.hideModal();
    },
    vintegize(tempURL, { contrast, brigntness, vignette }) {
      return this.$vintage(tempURL, { contrast, brigntness, vignette })
          .then(res => res.getDataURL())
          .then(img => img);
    },
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const arrBuffer = new ArrayBuffer(byteString.length);
      const intArr = new Uint8Array(arrBuffer);
      for (let i = 0; i < byteString.length; i += 1) {
        intArr[i] = byteString.charCodeAt(i);
      }

      return new Blob([arrBuffer], { type: mimeString });
    },
  },
  components: {
    NavBar, 'app-footer': Footer, PulseLoader,
  },
};
</script>

<style lang="scss">
 #app {
   background: white;
   padding: 80px 0;
   p {
     color: paleturquoise
   }
 }

 @media (min-width: 40.0rem) { 
  main {
    padding: 0 5%;
  }
}

.img-to-upload {
  display: flex;
  justify-content: center;
}

.img-to-upload img {
  width: auto;
  height: 200px;
  margin-top: 35px;
}

.filters {
  display: flex;
  justify-content: center;
}

.filter img {
  width: 100px;
  margin: 10px;
  height: auto;
}

button.choose-button {
  width: 100%;
  background: #115688;
  border: darken(#115688, 10);
}

h4 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
}

// Vodal
.vodal,
.vodal-mask {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}

.vodal {
    position: fixed;
}

.vodal-mask {
    position: absolute;
    background: rgba(0, 0, 0, .3);
}

.vodal-dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // margin: 15px auto;
    z-index: 101;
    padding: 15px;
    background: #fff;
    // border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    width: 100% !important;
    height: 1000px !important;
}

.vodal-close {
    position: absolute;
    cursor: pointer;
    top: 16px;
    right: 16px;
    width: 16px;
    height: 16px;
}

.vodal-close:before,
.vodal-close:after {
    position: absolute;
    content: '';
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: #999;
    border-radius: 100%;
    -webkit-transition: background .2s;
    transition: background .2s;
}

.vodal-close:before {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.vodal-close:after {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

.vodal-close:hover:before,
.vodal-close:hover:after {
    background: #333;
}

/* -- fade -- */
@-webkit-keyframes vodal-fade-enter {
    from {
        opacity: 0;
    }
}

@keyframes vodal-fade-enter {
    from {
        opacity: 0;
    }
}

.vodal-fade-enter-active {
    -webkit-animation: vodal-fade-enter both ease-in;
    animation: vodal-fade-enter both ease-in;
}

@-webkit-keyframes vodal-fade-leave {
    to {
        opacity: 0
    }
}

@keyframes vodal-fade-leave {
    to {
        opacity: 0
    }
}

.vodal-fade-leave-active {
    -webkit-animation: vodal-fade-leave both ease-out;
    animation: vodal-fade-leave both ease-out;
}
</style>
