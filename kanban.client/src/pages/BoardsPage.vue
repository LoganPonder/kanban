<template>
  <div v-if="state.loading==true">
    Loading...
  </div>
  <div class="home flex-grow-1 d-flex flex-column container-fluid" v-else>
    <div class="row">
      <div class="col d-flex flex-column">
        <p class="align-self-md-start">
          Hello, {{ state.account.name }}
        </p>
        <form @submit.prevent="createBoard" class="align-self-md-end">
          <div class="input-group">
            <input type="text"
                   name="addBoard"
                   placeholder="board title..."
                   id="newBoard"
                   v-model="state.newBoard.title"
            >
            <div class="input-group-append">
              <button class="btn btn-success" type="submit">
                Add Board
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-between row m-3">
      <Board v-for="board in state.boards" :key="board.id" :board="board" />
    </div>
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
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}

*{
  outline:1px solid red;
}
</style>
