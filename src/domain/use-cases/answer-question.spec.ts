import { describe, expect, it } from 'vitest'
import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  }
}
describe('Create an answer', () => {
  it('Should be able to create a new answer'), async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'teste resposta'
    })

    expect(answer.content).toEqual('teste reposta')
  }
})