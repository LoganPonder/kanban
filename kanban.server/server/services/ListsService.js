import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getAllLists(id = {}) {
    return await dbContext.List.find(id)
  }

  async getListById(id) {
    const data = await dbContext.List.findOne({ _id: id })
    if (!data) throw new BadRequest('Invalid Id')
    return data
  }

  async createList(body) {
    return await dbContext.List.create(body)
  }

  async deleteList(id) {
    const data = await dbContext.List.findOneAndDelete({ _id: id })
    if (!data) throw new BadRequest('Invalid Id')
    return 'Successfully Deleted'
  }

  async editList(body) {
    const data = await dbContext.List.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) throw new BadRequest('Invalid Id')
    return data
  }
}

export const listsService = new ListsService()
