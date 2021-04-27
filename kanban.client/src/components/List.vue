<template>
  <div class="List col-md-3 my-3 ">
    <div>
      <div class="d-flex">
        <h3>{{ list.title }}</h3>
        <i class="fas fa-times delete-icon" @click="deleteList(list.id, list.boardId)"></i>
      </div>
      <div>
        <Task v-for="task in state.tasks" :key="task.id" :task="task" />
      </div>
      <div>
        <form @submit.prevent="createTask">
          <input type="text" placeholder="Add task..." v-model="state.newTask.title">
          <button type="submit" class="btn btn-sm btn-dark text-white">
            Add Task
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
export default {
  name: 'List',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      tasks: computed(() => AppState.tasks[props.list.id]),
      newTask: {}
    })
    onMounted(async() => {
      try {
        await tasksService.getAllTasksByListId(props.list.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async createTask() {
        try {
          state.newTask.listId = props.list.id
          await tasksService.createTask(state.newTask)
          Notification.toast('Succesfully Created', 'success')
          state.newTask = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deleteList(id, boardId) {
        try {
          await listsService.deleteList(id, boardId)
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
