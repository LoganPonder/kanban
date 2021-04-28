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

  async editTask(task, oldListId) {
    await api.put(`api/tasks/${task.id}`, task)
    this.getAllTasksByListId(task.listId)
    this.getAllTasksByListId(oldListId)
  }

  setTask(task) {
    AppState.tempTask = task
  }
}
export const tasksService = new TasksService()
