<template>
  <div v-if="state.loading">
    Loading...
  </div>
  <div class="board-details-page container-fluid" v-else>
    <div class="row flex-column shadow">
      <h1 class="board-title">{{ state.activeBoard.title }}</h1>
      <form @submit.prevent="createList" class="newlist-form align-self-end pb-4 pr-3">
        <input type="text"
               name="addList"
               placeholder="Title..."
               id="newList"
               v-model="state.newList.title"
               class="p-1"
        >
        <button type="submit" class="btn btn-dark text-white">
          Add List
        </button>
      </form>
    </div>
    <div class="row">
      <List v-for="list in state.lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
import { useRoute } from 'vue-router'
export default {
  name: 'BoardDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newList: {},
      activeBoard: computed(() => AppState.activeBoard),
      lists: computed(() => AppState.lists)
    })
    onMounted(async() => {
      try {
        await boardsService.getBoardById(route.params.id)
        await listsService.getAllListsByBoardId(route.params.id)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async createList() {
        try {
          state.newList.boardId = route.params.id
          await listsService.createList(state.newList)
          state.newList = {}
          Notification.toast('Successfully Created', 'success')
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

.board-details-page {
  background-color: $bg-dark;
}

.board-title {
  font-family: $primary-font;
  font-size: 6rem;
  color: $off-white;
  margin-left: 2rem;
  margin-top: 3rem;
}

input {
  min-width: 30vw;
}
</style>
