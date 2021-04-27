import { AppState } from '../AppState'
import { api } from './AxiosService'

class BoardsService {
  async getAllBoards() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  async getBoardById(id) {
    const res = await api.get(`api/boards/${id}`)
    AppState.activeBoard = res.data
  }

  async createBoard(newBoard) {
    await api.post('api/boards', newBoard)
    this.getAllBoards()
  }

  async deleteBoard(id) {
    await api.delete(`api/boards/${id}`)
    this.getAllBoards()
  }
}
export const boardsService = new BoardsService()
