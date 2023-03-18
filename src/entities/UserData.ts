import { TodoList } from './TodoList'

export class UserData {
  constructor (
    public id: number,
    public fistName: string,
    public lastName: string,
    public email: string,
    public todoLists: TodoList[] = [],
  ) {}
}
