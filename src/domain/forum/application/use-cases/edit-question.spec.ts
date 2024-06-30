import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { expect } from 'vitest'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('Should be able to edit a question', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'Title update',
      content: 'Content update',
      questionId: newQuestion.id.toValue(),
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Title update',
      content: 'Content update',
    })
  })

  it('Should not be able to edit a question with an invalid id', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        authorId: 'author-1',
        title: 'Title update',
        content: 'Content update',
        questionId: 'question-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('Should not be able to edit a question from another author', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        title: 'Title update',
        content: 'Content update',
        questionId: newQuestion.id.toValue(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

