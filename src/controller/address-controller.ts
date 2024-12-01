import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import {
  CreateAddressRequest,
  getAddressRequest,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressServices } from "../services/address-service";

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contact_id = Number(req.params.contactId);

      const response = await AddressServices.create(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: getAddressRequest = {
        id: Number(req.params.addressId),
        contact_id: Number(req.params.contactId),
      };

      const response = await AddressServices.get(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateAddressRequest = req.body as UpdateAddressRequest;
      request.id = Number(req.params.addressId);
      request.contact_id = Number(req.params.contactId);
      const response = await AddressServices.update(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
