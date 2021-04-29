<template>
  <div v-if="state.loading==true">
    Loading...
  </div>
  <div class="home flex-grow-1 d-flex flex-column container-fluid" v-else>
    <div class="row board-header">
      <div class="col d-flex welcome-text justify-content-between">
        <h2 class="align-self-md-start welcome-texts">
          Welcome Back, <span class="name">{{ state.account.name }}</span>
        </h2>
        <form @submit.prevent="createBoard" class="newBoard-form">
          <div class="input-group">
            <input type="text"
                   name="addBoard"
                   placeholder="board title..."
                   id="newBoard"
                   v-model="state.newBoard.title"
            >
            <div class="input-group-append">
              <button class="btn btn-dark" type="submit">
                Add Board
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-start row m-3 board-content flex-grow-1">
      <Board v-for="board in state.boards" :key="board.id" :board="board" />
    </div>
    <img class="img-fluid d-xl-block d-none" src="../assets/img/setup.svg" alt="setup">
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'BoardsPage',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      boards: computed(() => AppState.boards),
      loading: true,
      newBoard: {}

    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async createBoard() {
        try {
          await boardsService.createBoard(state.newBoard)
          state.newBoard = {}
          Notification.toast('Succesfully Created', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
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

  .board-content {
    position: relative;
    overflow: hidden;
    z-index: 2;
  }

   img{
    height: 65vh;
    position: absolute;
    bottom: 10%;
    right: 22%;
    opacity: 20%;
    z-index: 0;
  }

  .welcome-text{
    font-size:2rem;
    color: $bg-dark;
    text-transform: uppercase;
  }

  h2 {
    font-weight: 300;
  }
  .name {
    font-weight: 600;
    font-size: 3rem;
  }

  .board-header{
    background-color: $white;
    padding: 2rem ;
  }
}

@media (max-width: $layout-breakpoint-large) {
  .welcome-text {
    flex-direction: column;
    text-align: left;
  }
}
@media (max-width: $layout-breakpoint-medium) {
  .welcome-text {
    flex-direction: column;
  }

  form {
    align-self: flex-start;
  }

  .welcome-texts {
    font-size: 1.2rem !important;
    text-align: left;
  }

  span {
    font-size: 1.5rem !important;
  }
  form {
    align-self: flex-start;
  }

  input {
    max-width: 50% !important;
    font-size: 1rem;
    padding-left: .5rem;
  }
}
</style>
