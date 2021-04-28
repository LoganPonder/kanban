<template>
  <div class="home flex-grow-1 d-flex flex-column container-fluid">
    <div class="row">
      <div class="col">
        <h1 class="title">
          Welcome to <span class="kanban-title">Kanban</span>
        </h1>
        <p class="subtitle" v-if="!user.isAuthenticated">
          Please login to continue...
        </p>
        <p class="subtitle" v-if="user.isAuthenticated">
          Let's get to work!
        </p>
        <div>
          <span v-if="user.isAuthenticated"></span>
          <span class="navbar-text" v-else>
            <button
              class="btn btn-outline-primary text-uppercase login-button shadow"
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
  background-color: $bg-dark;
  font-family: $primary-font;
  color: $white;
  > img{
    height: 200px;
    width: 200px;
  }
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

  .title{
    font-size: 7rem;
    display: block;
    text-align: left;
    padding-top: 5%;
    padding-left:3%;
  }
 .subtitle{
   font-size: 3rem;
   display: block;
  }
  .kanban-title{

}
.login-button{
  padding: 2rem 4rem;
  font-size: 2rem;
  background-color: $accent;
  border-radius: 10px;
  color: $dark;
  cursor: pointer;

  &:hover{
    transform: scale(1.03);
    filter: brightness(110%);
  }
}

</style>
