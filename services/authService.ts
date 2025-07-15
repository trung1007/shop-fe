class AuthService {
  private tokenKey = 'auth_token';

  login(username: string, password: string): boolean {
    // Giả lập đăng nhập: nếu username và password đều là 'admin' thì thành công
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem(this.tokenKey, 'dummy_token');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}

export default new AuthService();