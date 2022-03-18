import { TodoItem } from "./TodoItem"

export class TodoList {
  constructor (
    public title: string,
    public items: TodoItem[],
  ) {}
}
