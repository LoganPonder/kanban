import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentsService {
  async getAllCommentsByTaskId(id) {
    const res = await api.get(`api/tasks/${id}/comments`)
    AppState.comments[id] = res.data
  }

  async createComment(newComment) {
    await api.post('api/comments', newComment)
    this.getAllCommentsByTaskId(newComment.taskId)
  }

  async deleteComment(id, taskId) {
    await api.delete(`api/comments/${id}`)
    this.getAllCommentsByTaskId(taskId)
  }
}
export const commentsService = new CommentsService()
