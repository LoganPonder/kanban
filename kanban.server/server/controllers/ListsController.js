import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getListById)
      .get('/:id/tasks', this.getTasksByListId)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.createList)
      .delete('/:id', this.deleteList)
      .put('/:id', this.editList)
  }

  async getTasksByListId(req, res, next) {
    try {
      const tasks = await tasksService.getAllTasks({ listId: req.params.id })
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getListById(req, res, next) {
    try {
      const list = await listsService.getListById({ _id: req.params.id })
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const newList = await listsService.createList(req.body)
      return res.send(newList)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const data = await listsService.deleteList(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editList(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.id = req.params.id
      const data = await listsService.editList(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
