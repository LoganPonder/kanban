<template>
  <div class="Comment comment-container p-2">
    <div class="comment-text">
      <p class="comment-title">
        {{ comment.title }}
      </p>
      <i class="fas fa-times delete-icon" @click="deleteComment(comment.id, comment.taskId)"></i>
    </div>
    <small class="comment-creator pl-3 pt-0">
      - {{ comment.creator.name }}
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
@import '../assets/scss/_variables.scss';
.comment-container{
line-height: 1;
margin-bottom:1rem;
border-bottom: 1px solid $bg-dark;

.comment-text{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $bg-dark;

  .comment-title{
margin-bottom:0;
font-size: 2rem;
}

  .delete-icon{
  cursor:pointer;
  color:$accent;
  font-size: 1.5rem;
  }
}
}

</style>
