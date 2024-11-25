import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "./../model/contact-model";
import { logger } from "../application/logging";
export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    const record = {
      ...createRequest,
      ...{ username: user.username },
    };
    const createContact = await prismaClient.contact.create({
      data: record,
    });

    logger.info(createContact);

    return toContactResponse(createContact);
  }

  //   static async get(user: User, contact: Contact): Promise<ContactResponse> {
  //     return toUserResponse(contact);
  //   }
}
