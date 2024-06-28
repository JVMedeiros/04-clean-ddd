import { expect } from 'vitest'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswersRepository = {
  create: async () => {},
}
test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
  await expect(() =>
    answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'teste resposta',
    }),
  )
})
