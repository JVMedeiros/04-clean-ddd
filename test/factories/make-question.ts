import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
  override: Partial<QuestionProps> = {}
) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
    slug: Slug.create('example'),
    ...override
  })

  return question
}