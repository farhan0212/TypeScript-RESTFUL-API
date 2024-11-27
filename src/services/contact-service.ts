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
import { ResponseError } from "../error/response.error";
import { UpdateContactRequest } from "../model/contact-model";
export class ContactService {
  static async checkContactMustExist(username: string, contactId: number) {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }
    return contact;
  }

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

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExist(user.username, id);
    return toContactResponse(contact);
  }

  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    const updateRequest = Validation.validate(
      ContactValidation.UPDATE,
      request
    );
    await this.checkContactMustExist(user.username, updateRequest.id);
    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });
    return toContactResponse(contact);
  }
}
