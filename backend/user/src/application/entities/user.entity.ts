import { Replace } from '@helpers/Replace';
import { Name } from './name.entity';
import { randomUUID } from 'node:crypto';
import { Email } from './email.entity copy';
import { hashSync } from 'bcrypt';

export interface UserProps {
  name: Name;
  email: Email;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set name(name: Name) {
    this.props.name = name;
  }

  public get name(): Name {
    return this.props.name;
  }

  public set email(email: Email) {
    this.props.email = email;
  }

  public get email(): Email {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = hashSync(password, 10);
  }

  public get password(): string {
    return this.props.password;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set updatedAt(updatedAt: Date | undefined) {
    this.props.updatedAt = updatedAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
