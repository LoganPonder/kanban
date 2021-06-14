import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAllBoards(id = {}) {
    return await dbContext.Board.find(id)
    // return await dbContext.Board.find({ creatorId: id })
  }

  async getBoardById(id) {
    const data = await dbContext.Board.findOne({ _id: id })
    if (!data) throw new BadRequest('Invalid Id')
    return data
  }

  async createBoard(body) {
    return await dbContext.Board.create(body)
  }

  async deleteBoard(id, userId) {
    const data = await dbContext.Board.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) throw new BadRequest('Invalid Id')
    return 'Successfully Deleted'
  }

  async editBoard(body) {
    const data = await dbContext.Board.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) throw new BadRequest('Invalid Id')
    return data
  }
}

export const boardsService = new BoardsService()
