<template>
  <div class="List col-md-3 my-3 ">
    <div class="py-4 px-3 text-white rounded shadow list-container">
      <div class="d-flex">
        <h3 class="list-title">
          {{ list.title }}
        </h3>
        <i class="fas fa-times fa-2x delete-icon" @click="deleteList(list.id, list.boardId)"></i>
      </div>
      <div>
        <Task v-for="task in state.tasks" :key="task.id" :task="task" />
      </div>
      <div>
        <form @submit.prevent="createTask">
          <input type="text" placeholder="Add task..." v-model="state.newTask.title" class="w-75 p-1 mb-2">
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
@import '../assets/scss/_variables.scss';

.list-container {
  position: relative;
  background-color: $body-bg;
}

.list-title {
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: $primary-font;
  font-weight: 400;
  color: $bg-dark
}

.delete-icon{
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor:pointer;
  color:red;
  }

</style>
