<template>
  <div class="Board col-md-4 my-3 ">
    <div class="m-3 bg-dark py-5">
      <router-link :to="{name: 'BoardDetailsPage', params:{id:board.id}}">
        <div class="d-flex flex-column">
          <i class="fas fa-bold fa-3x"></i>
          <i class="fas fa-times delete-icon" @click="deleteBoard(board.id)"></i>
          <h2>{{ board.title }}</h2>
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
// @import './scss/_variables.scss'
.delete-icon{
  cursor:pointer;
  color:red;
  }

  *{
  outline:1px solid red;
}
</style>
