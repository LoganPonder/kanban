import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAllTasks(id = {}) {
    return await dbContext.Task.find(id)
  }

  async getTaskById(id) {
    const data = await dbContext.Task.findOne({ _id: id })
    if (!data) throw new BadRequest('Invalid Id')
    return data
  }

  async createTask(body) {
    return await dbContext.Task.create(body)
  }

  async deleteTask(id) {
    const data = await dbContext.Task.findOneAndDelete({ _id: id })
    if (!data) throw new BadRequest('Invalid Id')
    return 'Successfully Deleted'
  }

  async editTask(body) {
    const data = await dbContext.Task.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) throw new BadRequest('Invalid Id')
    return data
  }
}

export const tasksService = new TasksService()
