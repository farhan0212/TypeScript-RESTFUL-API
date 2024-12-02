import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  getAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response.error";

export class AddressServices {
  static async checkAddressMustExist(
    contactId: number,
    addressId: number
  ): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });
    if (!address) {
      throw new ResponseError(404, "Address not found");
    }
    return address;
  }
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    );
    await ContactService.checkContactMustExist(
      user.username,
      request.contact_id
    );

    const address = await prismaClient.address.create({
      data: createRequest,
    });

    return toAddressResponse(address);
  }

  static async get(
    user: User,
    request: getAddressRequest
  ): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);

    await ContactService.checkContactMustExist(
      user.username,
      request.contact_id
    );
    const address = await AddressServices.checkAddressMustExist(
      getRequest.id,
      getRequest.contact_id
    );

    return toAddressResponse(address);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    const updateRequest = Validation.validate(
      AddressValidation.UPDATE,
      request
    );
    await ContactService.checkContactMustExist(
      user.username,
      request.contact_id
    );
    await AddressServices.checkAddressMustExist(
      updateRequest.id,
      updateRequest.contact_id
    );
    const address = await prismaClient.address.update({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id,
      },
      data: updateRequest,
    });
    return toAddressResponse(address);
  }
}
