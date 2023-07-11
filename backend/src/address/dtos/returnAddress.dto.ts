export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;

  constructor(partial: Partial<ReturnAddressDto>) {
    this.complement = partial.complement;
    this.numberAddress = partial.numberAddress;
    this.cep = partial.cep;
  }
}
