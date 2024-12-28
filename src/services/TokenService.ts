export default class TokenService {
  private static tokenKey = 'jwt-token'

  static setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  static getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  static removeToken(): void {
    localStorage.removeItem(this.tokenKey)
  }

  static isTokenValid(): boolean {
    const token = this.getToken()
    if (!token) return false

    const decoded = this.decodeToken(token)
    if (!decoded.exp) return false

    const expiryDate = new Date(decoded.exp * 1000)
    return expiryDate > new Date()
  }

  private static decodeToken(token: string): any {
    const payload = token.split('.')[1]
    const decoded = atob(payload)
    return JSON.parse(decoded)
  }
}
