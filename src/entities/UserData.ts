import { TodoList } from './TodoList'

export class UserData {
  constructor (
    public name: string,
    public email: string,
    public todoLists: TodoList[] = [],
  ) {}
}
