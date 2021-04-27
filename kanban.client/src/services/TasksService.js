import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getAllTasksByListId(id) {
    const res = await api.get(`api/lists/${id}/tasks`)
    AppState.tasks[id] = res.data
  }

  async createTask(newTask) {
    await api.post('api/tasks', newTask)
    this.getAllTasksByListId(newTask.listId)
  }

  async deleteTask(id, listId) {
    await api.delete(`api/tasks/${id}`)
    this.getAllTasksByListId(listId)
  }
}
export const tasksService = new TasksService()
