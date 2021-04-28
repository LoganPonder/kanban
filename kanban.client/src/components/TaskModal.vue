<template>
  <div class="modal fade"
       :id="'taskModal' + task.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ task.title }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <Comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
        </div>
        <div class="modal-footer">
          <div class="input-group mb-3">
            <form @submit.prevent="createComment">
              <input type="text" class="form-control" placeholder="Add Comment..." v-model="state.newComment.title">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="Task" data-toggle="modal" data-target="#exampleModal">
    {{ task.title }}
  </div>
  <div>
    <Comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
  </div>
  <div class="input-group mb-3">
    <form @submit.prevent="createComment">
      <input type="text" class="form-control" placeholder="Add Comment..." v-model="state.newComment.title">
    </form>
  </div> -->
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import Notification from '../utils/Notification'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'TaskModal',
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
  *{
  outline:1px solid red;
}
</style>
