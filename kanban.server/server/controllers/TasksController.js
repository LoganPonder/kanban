import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import { tasksService } from '../services/TasksService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/comments', this.getCommentsByTaskId)
      .get('/:id', this.getTaskById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.createTask)
      .delete('/:id', this.deleteTask)
      .put('/:id', this.editTask)
  }

  async getCommentsByTaskId(req, res, next) {
    try {
      const comments = await commentsService.getAllComments({ taskId: req.params.id })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await tasksService.getTaskById({ _id: req.params.id })
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const newTask = await tasksService.createTask(req.body)
      return res.send(newTask)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const data = await tasksService.deleteTask(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.id = req.params.id
      const data = await tasksService.editTask(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
