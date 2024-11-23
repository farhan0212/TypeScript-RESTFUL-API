import { User } from "@prisma/client";

// membuat tipe data UserResponse dengan username (string), name (string), dan juga token yang nullable
export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};

// membuat tipe data createUserRequest berupa username, name, dan password
export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
};

// membuat tipe daya untuk login
export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};

// membuat export function respon kepada user yaitu name, dan username
export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
  };
}
