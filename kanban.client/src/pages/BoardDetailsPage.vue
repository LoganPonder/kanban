<template>
  <div v-if="state.loading">
    Loading...
  </div>
  <div class="board-details-page container-fluid" v-else>
    <div class="row flex-column">
      <h1>{{ state.activeBoard.title }}</h1>
      <form @submit.prevent="createList">
        <label for="newList">Add a New List</label>
        <input type="text"
               name="addList"
               placeholder="Title..."
               id="newList"
               v-model="state.newList.title"
        >
        <button type="submit" class="btn btn-success">
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

* {
  outline:1px solid red;
}
</style>
