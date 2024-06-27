import { randomUUID } from "crypto";

class Instructor {
  public id: string
  public name: string;

  constructor(name: string, id?: string) {
    this.name = name
    this.id = id ?? randomUUID()
  }
}