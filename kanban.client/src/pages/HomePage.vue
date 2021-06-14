<template>
  <div class="home flex-grow-1 d-flex flex-column container-fluid">
    <div class="row">
      <div class="col">
        <div class="title-text">
          <h1 class="title display-1" data-aos="fade-right" data-aos-duration="1500">
            Welcome to <span class="kanban-title">Kanban,</span>
          </h1>
          <p class="subtitle" v-if="!user.isAuthenticated">
            Please login to continue...
          </p>
          <p class="subtitle" v-if="user.isAuthenticated">
            Let's get to work!
          </p>
        </div>
        <div>
          <span v-if="user.isAuthenticated"></span>
          <span class="navbar-text" v-else>
            <button
              class="btn text-uppercase login-button shadow mt-4"
              @click="login"
              v-if="!user.isAuthenticated"
            >
              Login
            </button>

            <div class="dropdown" v-else>
              <div
                class="dropdown-toggle"
                @click="state.dropOpen = !state.dropOpen"
              >
                <img
                  :src="user.picture"
                  alt="user photo"
                  height="40"
                  class="rounded"
                />
                <span class="mx-3">{{ user.name }}</span>
              </div>
              <div
                class="dropdown-menu p-0 list-group w-100"
                :class="{ show: state.dropOpen }"
                @click="state.dropOpen = false"
              >
                <router-link :to="{ name: 'Account' }">
                  <div class="list-group-item list-group-item-action hoverable">
                    Account
                  </div>
                </router-link>
                <div
                  class="list-group-item list-group-item-action hoverable"
                  @click="logout"
                >
                  logout
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <!-- go back to here -->
    <div class="row justify-content-center align-items-center home-content">
      <div class="col-lg-10 col-xl-5 pb-5 ">
        <div class="image-container">
          <img class="img-fluid" src="../assets/img/board-girl.svg" alt="borad girl">
        </div>
      </div>
      <div class="col-lg-12 col-xl-5 info-text">
        <div class="info-text-container">
          <ul>
            <li class="d-flex align-items-center mb-4">
              <i class="fas fa-chevron-circle-right"></i> <p>Help your team stay organized</p>
            </li>
            <li class="d-flex align-items-center mb-4">
              <i class="fas fa-chevron-circle-right"></i> <p>Collaborate on tasks</p>
            </li>
            <li class="d-flex align-items-center mb-4">
              <i class="fas fa-chevron-circle-right"></i> <p>Implement <span>SCRUM</span> methodology</p>
            </li>
            <li class="d-flex align-items-center mb-4">
              <i class="fas fa-chevron-circle-right"></i> <p>Receive feedback on various tasks</p>
            </li>
            <li class="d-flex align-items-center">
              <i class="fas fa-chevron-circle-right"></i> <p>Increase office productivity</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      boards: computed(() => AppState.boards)
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        await AuthService.loginWithPopup()
        router.push({ name: 'BoardsPage' })
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/_variables.scss';

.home{
  text-align: center;
  user-select: none;
  background-color: $off-white;
  font-family: $primary-font;
  color: $white;
  > img{
    height: 200px;
    width: 200px;
  }
}

button {
  background: #fc4a1a;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #fb8500, #ff9e2f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #fb8500, #ff9e2f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}

.title-text {
  line-height: .5;
}

  .title{
    font-size: 7rem;
    color: $bg-dark;
    display: block;
    text-align: left;
    padding-top: 5%;
    padding-left:3%;
  }
 .subtitle{
   font-size: 3rem;
   font-weight: 100;
   display: block;
   color: $bg-dark
  }
  .kanban-title{
    font-weight: 500;
    padding-bottom: 0;
  }
.login-button{
  padding: 1.5rem 4rem;
  font-size: 2rem;
  background-color: $accent;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;

  &:hover{
    transform: scale(1.03);
    filter: brightness(110%);
  }

}

.info-text-container {
  margin-top: 5rem;

  li {
    text-decoration: none;
  }
  i {
    color: $bg-dark;
    font-size: 3rem;
  }

  p {
    font-size: 1.6rem;
    color: $bg-dark;
    margin-left: 1rem;
    margin-top: .8rem;

    span {
      color: $accent;
    }
  }
}

@media (max-width: $layout-breakpoint-large) {
   ul {
     margin-left: 3rem;
   }
    .home-content{
    flex-direction: column !important;
  }

  .title {
    font-size: 5rem;
  }

  .subtitle {
    font-size: 2rem;
  }

  li {
    text-align: left;
  }

  p {
    font-size: 1rem;
  }
}

@media (max-width: $layout-breakpoint-medium) {
  .title {
    font-size: 4rem;
  }
  .subtitle {
    text-align: left;
    margin-left: 1rem;
  }

  .login-button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  }
}
@media (max-width: $layout-breakpoint-small) {
  .title {
    font-size: 3rem;
  }
   .subtitle {
    font-size: 1.5rem;
  }

  i {
    font-size: 2rem !important;
  }

  p {
    font-size: 1.3rem !important;
  }

  ul {
    padding-left: 0 !important;
    margin-left: 0;
  }

  .info-text-container {
    margin-top: 0 !important;
  }

}
</style>
