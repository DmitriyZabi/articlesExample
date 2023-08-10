export interface IComment {
  id: number
  text: string
  dateTime: Date
  user: {
    id: number
    name: string
  }
}
