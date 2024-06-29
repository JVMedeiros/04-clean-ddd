import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { expect } from 'vitest'
import { DeleteQuestionUseCase } from './delete-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('Should be able to delete a question', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1'
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete a question from another author', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

