import { QuestionAttachment } from '../../enterprise/entities/question-attatchment'

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
