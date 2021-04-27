import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllBoards)
      .get('/:id', this.getBoardById)
      .get('/:id/lists', this.getListsByBoardId)
      .post('', this.createBoard)
      .delete('/:id', this.deleteBoard)
      .put('/:id', this.editBoard)
  }

  async getAllBoards(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const boards = await boardsService.getAllBoards({ creatorId: req.userInfo.id })
      // const boards = await boardsService.getAllBoards(req.userInfo.id)
      return res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  async getBoardById(req, res, next) {
    try {
      const board = await boardsService.getBoardById({ _id: req.params.id })
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async getListsByBoardId(req, res, next) {
    try {
      const lists = await listsService.getAllLists({ boardId: req.params.id })
      return res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const newBoard = await boardsService.createBoard(req.body)
      return res.send(newBoard)
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const data = await boardsService.deleteBoard(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editBoard(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.id = req.params.id
      const data = await boardsService.editBoard(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
