import { describe, expect, it } from 'vitest'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswersRepository = {
  create: async () => { },
}
describe('Create an answer', () => {
  it('Should be able to create a new answer')
    ; async () => {
      const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
      await expect(() =>
        answerQuestion.execute({
          questionId: '1',
          instructorId: '1',
          content: 'teste resposta',
        }),
      )
    }
})
