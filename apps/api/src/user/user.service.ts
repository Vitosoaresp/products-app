import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User, UserDto } from "@products-app/schemas";
import { Model } from "mongoose";
import { encrypt } from "utils/bcrypt";

@Injectable()
export class UserService {
  constructor(@Inject("USER_MODEL") private _model: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this._model.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return this._model.findOne({ email })
    .exec()
    .then(user => {
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`)
      }
      return user;
    })
  }

  async create(payload: UserDto): Promise<User> {
    const existingUser = await this._model.findOne({
      email: payload.email,
    }).exec();
    if (existingUser) {
      throw new NotFoundException(`User with email ${payload.email} already exists`);
    }

    const encriptedPassword = await encrypt(payload.password);

    const createdUser = new this._model({
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      password: encriptedPassword,
    });
    return createdUser.save();
  }

  async update(id: string, payload: UserDto): Promise<User> {
    const existingUser = await this._model.findOne({ email: payload.email }).exec();
    if (existingUser) {
      throw new NotFoundException(`User with email ${payload.email} already exists`);
    }

    return this._model.findByIdAndUpdate(id, {
      ...payload,
      updatedAt: new Date(),
    }, { new: true }).exec().then(user => {
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    })
  }

  async delete(id: string): Promise<User> {
    return this._model.findOneAndUpdate({
      _id: id
    }, {
      $set: {
        deletedAt: new Date()
      }
    }, {
      new: true
    }).exec();
  }
}
