import { describe, expect, it } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

describe('Create an answer', () => {
  it('Should be able to create a new answer'), () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'teste resposta'
    })

    expect(answer.content).toEqual('teste reposta')
  }
})