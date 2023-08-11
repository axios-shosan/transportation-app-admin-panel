export type AuthSession = {
  accessToken: string
  refreshToken: string
  accessTokenExpires: string
  expires: string
  error: string
  user: {
    id?: number
    shipper: number
    carrier: number
  }
}
