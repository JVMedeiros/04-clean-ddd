import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { expect } from 'vitest'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })
  it('Should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('answer-1'))
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      content: 'Content update',
      answerId: newAnswer.id.toValue(),
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Content update',
    })
  })

  it('Should not be able to edit a answer with an invalid id', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('answer-1'))
    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'author-1',
        content: 'Content update',
        answerId: 'answer-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('Should not be able to edit a answer from another author', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('answer-1'))
    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        content: 'Content update',
        answerId: newAnswer.id.toValue(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

