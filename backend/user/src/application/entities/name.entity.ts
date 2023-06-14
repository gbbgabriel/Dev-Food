export class Name {
  private readonly name: string;

  get value(): string {
    return this.name;
  }

  private validateNameLenght(name: string): boolean {
    return name.length >= 2 && name.length <= 15;
  }

  constructor(name: string) {
    const isNameLenghtValue = this.validateNameLenght(name);

    if (!isNameLenghtValue) {
      throw new Error('Content lenght error.');
    }

    this.name = name;
  }
}
