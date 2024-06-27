import { randomUUID } from "crypto";

export class Question {
  public id: string;
  public title: string;
  public content: string;
  public authorId: string

  constructor(title: string, content: string, authorId: string, id?: string) {
    this.title = title
    this.content = content
    this.authorId = authorId
    this.id = id ?? randomUUID()

  }
}