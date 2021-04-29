<template>
  <div class="Board col-md-4 my-3 ">
    <div class="m-3 py-5 board-container rounded">
      <i class="fas fa-times delete-icon" @click="deleteBoard(board.id)"></i>
      <router-link class="link-no-style" :to="{name: 'BoardDetailsPage', params:{id:board.id}}">
        <div class="d-flex flex-column board-content">
          <i class="fas fa-bold fa-3x board-icon p-2"></i>
          <h2 class="board-title">
            {{ board.title }}
          </h2>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'Board',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      boards: computed(() => AppState.boards)
    })
    return {
      state,
      async deleteBoard(id) {
        try {
          await boardsService.deleteBoard(id)
          Notification.toast('Succesfully Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.board-container{
    font-family: $primary-font;
    box-shadow: 0 1.5rem 4rem rgba($bg-dark, .15);
    transition: transform .3s;
    background-color: $off-white;
    position: relative;
    overflow: hidden;
    border-top: 1rem solid rgba(23, 52, 71, 0.705);

&:hover{
transform: translateY(-.15rem) scale(1.005);
}

img {
  position: absolute;
  top: -5rem;
  left: -6rem;
  height: 28rem;
  opacity: .05;
  z-index: 1;
}
.board-title{
font-size: 1.8rem;
text-decoration: none;
text-transform: uppercase;
color: $bg-dark;

router-link {
  z-index: 2;
  cursor: pointer;
}
&:hover{
  text-decoration: none;
}
}

.link-no-style{
  text-decoration: none;
  cursor: pointer;
}

.board-content {
  cursor: pointer !important;
}

 .board-icon{
  font-size: 6rem;
background: linear-gradient(-45deg, $accent, $accent-light, rgb(255, 179, 58), rgb(255, 180, 59));
background-size: 400% 400%;
animation: gradient 5s ease infinite;
background-clip: text;
color: transparent;
  }

  .delete-icon{
  cursor:pointer;
  color: $dark;
  position: absolute;
  top: 1rem;
  right:1rem;
  }

@keyframes gradient {
0% {
background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
  }
}
</style>
