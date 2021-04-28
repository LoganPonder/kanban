<template>
  <div class="Board col-md-4 my-3 ">
    <div class="m-3 py-5 board-container rounded">
      <i class="fas fa-times delete-icon" @click="deleteBoard(board.id)"></i>
      <router-link class="link-no-style" :to="{name: 'BoardDetailsPage', params:{id:board.id}}">
        <div class="d-flex flex-column">
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
    background-color: rgba(27, 62, 83, 0.705);
    position: relative;

&:hover{
transform: translateY(-.15rem) scale(1.005);
}
.board-title{
font-size: 1.8rem;
text-decoration: none;
text-transform: uppercase;

&:hover{
  text-decoration: none;
}
}

.link-no-style{
  text-decoration: none;
  cursor: pointer;
}

 .board-icon{
  font-size: 6rem;
background: linear-gradient(-45deg, $accent, $accent-light, rgb(111, 166, 255), rgb(59, 160, 255));
background-size: 400% 400%;
animation: gradient 5s ease infinite;
background-clip: text;
color: transparent;

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
  .delete-icon{
  cursor:pointer;
  color:$white;
  position: absolute;
  top: 1rem;
  right:1rem;
  }
}
</style>
