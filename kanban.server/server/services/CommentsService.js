import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAllComments(id = {}) {
    return await dbContext.Comment.find(id).populate('creator', 'name')
  }

  async getCommentById(id) {
    const data = await dbContext.Comment.findOne({ _id: id }).populate('creator', 'name')
    if (!data) throw new BadRequest('Invalid Id')
    return data
  }

  async createComment(body) {
    return await dbContext.Comment.create(body)
  }

  async deleteComment(id, userId) {
    const data = await dbContext.Comment.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) throw new BadRequest('Invalid Id')
    return 'Successfully Deleted'
  }

  async editComment(body) {
    const data = await dbContext.Comment.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) throw new BadRequest('Invalid Id')
    return data
  }
}

export const commentsService = new CommentsService()
