import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllComments)
      .get('/:id', this.getCommentById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)
      .put('/:id', this.editComment)
  }

  async getAllComments(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comments = await commentsService.getAllComments(req.body.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getCommentById(req, res, next) {
    try {
      const comment = await commentsService.getCommentById({ _id: req.params.id })
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const newComment = await commentsService.createComment(req.body)
      return res.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const data = await commentsService.deleteComment(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.id = req.params.id
      const data = await commentsService.editComment(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
