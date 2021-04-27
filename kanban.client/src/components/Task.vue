<template>
  <div class="Task">
    {{ task.title }}
    <i class="fas fa-times delete-icon" @click="deleteTask(task.id, task.listId)"></i>
  </div>
  <div>
    <Comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
  </div>
  <div class="input-group mb-3">
    <form @submit.prevent="createComment">
      <input type="text" class="form-control" placeholder="Add Comment..." v-model="state.newComment.title">
    </form>
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
.delete-icon{
  cursor:pointer;
  color:red;
  }
  *{
  outline:1px solid red;
}
</style>
