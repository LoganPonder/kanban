import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getAllListsByBoardId(id) {
    const res = await api.get(`api/boards/${id}/lists`)
    AppState.lists = res.data
  }

  async createList(newList) {
    await api.post('api/lists', newList)
    this.getAllListsByBoardId(newList.boardId)
  }

  async deleteList(id, boardId) {
    await api.delete(`api/lists/${id}`)
    this.getAllListsByBoardId(boardId)
  }
}
export const listsService = new ListsService()
