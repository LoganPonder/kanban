<template>
  <!-- go back to here, modal -->
  <div class="Task mb-3 task-container rounded py-2 px-2 shadow" @dragstart="setTask" draggable="true">
    <div class="task-text d-flex justify-content-between p-1">
      <h4 class="task-title ml-2">
        {{ task.title }}
      </h4>
      <button data-toggle="modal" :data-target="'#taskModal' + task.id" class="btn btn-sm btn-dark text-white mr-3 mb-2 details-button">
        Details
      </button>
      <i class="fas fa-times delete-icon pb-0 align-self-start" @click="deleteTask(task.id, task.listId)"></i>
    </div>
    <!-- go back here -->
    <TaskModal :task="task" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import Notification from '../utils/Notification'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newComment: {},
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments[props.task.id])

    })
    onMounted(async() => {
      try {
        await commentsService.getAllCommentsByTaskId(props.task.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      setTask() {
        tasksService.setTask(props.task)
      },
      async createComment() {
        try {
          state.newComment.taskId = props.task.id
          await commentsService.createComment(state.newComment)
          Notification.toast('Succesfully Created', 'success')
          state.newComment = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deleteTask(id, listId) {
        try {
          await tasksService.deleteTask(id, listId)
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

.task-container {
  background-color: $off-white;
  color: $bg-dark;
  position: relative;
  cursor: pointer;
}

.task-title {
  font-size: 1.7rem;
  font-weight: 300;
}

.details-button{
  align-self:flex-start
}

.delete-icon{
  position: absolute;
  top: 5px;
  right: 5px;
  cursor:pointer;
  color:$accent-light;
  }

</style>
