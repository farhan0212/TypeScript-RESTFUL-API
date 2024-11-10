import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response.error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export class UserService {
  //create class register dengan type data request CreateUserRequest
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    // membuat variabel registerRequest dan memvalidasi dengan zod dan juga helper
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );
    // mencari apakah username itu sudah digunakan atau belum dengan prisma count
    const totalUserWithUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    // membuat validasi jika username tersebut tidak sama dengan 0 (ada) maka lempar response Username already exist
    if (totalUserWithUsername !== 0) {
      throw new ResponseError(400, "Username Already Exist");
    }

    // lalu ketika username tidak maka maka selanjutnya ialah melakukan hashing terhadap password dengan bcrypt sebanyak 10 huruf dan sebagai string
    registerRequest.password = (await bcrypt.hash(
      registerRequest.password,
      10
    )) as string;

    //setelah berhasil menghashing password dan username unique maka selanjutkan diinputkan ke dalam database dengan query create

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    // memberikan response kepada user berupa name, username
    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "username of password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "username of password is wrong");
    }

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }
}
