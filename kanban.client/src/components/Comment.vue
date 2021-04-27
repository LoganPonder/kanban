<template>
  <div class="Comment">
    <small>
      {{ comment.title }}
      <i class="fas fa-times delete-icon" @click="deleteComment(comment.id, comment.taskId)"></i>
    </small>
  </div>
</template>

<script>
import { commentsService } from '../services/CommentsService'
import Notification from '../utils/Notification'
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      async deleteComment(id, taskId) {
        try {
          await commentsService.deleteComment(id, taskId)
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
