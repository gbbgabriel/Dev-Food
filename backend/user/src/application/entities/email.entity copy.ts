export class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  constructor(email: string) {
    const isEmailValid = this.validateEmailFormat(email);

    if (!isEmailValid) {
      throw new Error('Invalid email format.');
    }

    this.email = email;
  }
}
