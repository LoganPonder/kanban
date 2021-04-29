<template>
  <div class="modal"
       :id="'taskModal' + task.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header ">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ task.title }}
          </h5>
          <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
            <span class="close-x" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <Comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
        </div>
        <div class="modal-footer">
          <form @submit.prevent="createComment">
            <input type="text" class="form-control" placeholder="Add Comment..." v-model="state.newComment.title">
          </form>
        </div>
      </div>
    </div>
  </div>
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
      loading: true,
      newComment: {},
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments[props.task.id])

    })
    onMounted(async() => {
      try {
        await commentsService.getAllCommentsByTaskId(props.task.id)
        state.loading = false
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
@import '../assets/scss/_variables.scss';
.modal-header, .modal-footer{
  background-color: $bg-dark;
}
.modal-title{
  font-size:3rem;
  font-weight: 300;
  text-transform: uppercase;
  color: $white;
}

.close-x {
  color: $accent !important;
}

.close-modal{
  color: $accent;
}

</style>
