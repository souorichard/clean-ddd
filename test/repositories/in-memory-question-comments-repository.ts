import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRespository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) return null

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .splice((page - 1) * 20, page * 20)

    return questionComments
  }

  async create(questionComments: QuestionComment) {
    this.items.push(questionComments)
  }

  async delete(questionComments: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComments.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
