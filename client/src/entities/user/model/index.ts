export interface IUser {
  isAuthenticated: boolean
  email: string | null
  name: string | null
  token: string | null
}
