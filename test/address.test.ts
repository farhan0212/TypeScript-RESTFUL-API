import { web } from "./../src/application/web";
import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-utils";
import { logger } from "../src/application/logging";

describe("POST to /api/contacts/:contactId(\\d+)/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "pangjay",
        city: "mabes",
        province: "jekardah",
        country: "indonesia",
        postal_code: "1234312",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe("pangjay");
    expect(response.body.data.city).toBe("mabes");
    expect(response.body.data.province).toBe("jekardah");
    expect(response.body.data.country).toBe("indonesia");
    expect(response.body.data.postal_code).toBe("1234312");
  });
  it("shouldn't be able to create address coz wrong id", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "pangjay",
        city: "mabes",
        province: "jekardah",
        country: "indonesia",
        postal_code: "1234312",
      });
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it("should be able to create address only need column", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        country: "indonesia",
        postal_code: "1234312",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.country).toBe("indonesia");
    expect(response.body.data.postal_code).toBe("1234312");
  });
  it("shouldn't be able to create address coz need required input field", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        country: "indonesia",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("shouldn't be able to create address coz wrong data type", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "pangjay",
        city: "mabes",
        province: "jekardah",
        country: "indonesia",
        postal_code: 1234312,
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
describe("GET to /api/contacts/:contactId(\\d+)/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get address", async () => {
    const contact = await ContactTest.get();
    logger.debug(contact);
    const address = await AddressTest.get();
    logger.debug(address);
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe(address.street);
    expect(response.body.data.city).toBe(address.city);
    expect(response.body.data.province).toBe(address.province);
    expect(response.body.data.country).toBe(address.country);
    expect(response.body.data.postal_code).toBe(address.postal_code);
  });
  it("shouldn't be able to get address coz wrong address id", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined;
  });
  it("shouldn't be able to get address coz wrong contact id", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined;
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });
  it("should ", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)

      .set("X-API-TOKEN", "test")
      .send({
        street: "pangjay",
        city: "mabes",
        province: "jekardah",
        country: "indonesia",
        postal_code: "1234312",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(address.id);
    expect(response.body.data.street).toBe("pangjay");
    expect(response.body.data.city).toBe("mabes");
    expect(response.body.data.province).toBe("jekardah");
    expect(response.body.data.country).toBe("indonesia");
    expect(response.body.data.postal_code).toBe("1234312");
  });

  it("should unable to put data coz wrong address id", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)

      .set("X-API-TOKEN", "test")
      .send({
        street: "pangjay",
        city: "mabes",
        province: "jekardah",
        country: "indonesia",
        postal_code: "1234312",
      });
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it("should unable to put data coz wrong contact id", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)

      .set("X-API-TOKEN", "test")
      .send({
        street: "pangjay",
        city: "mabes",
        province: "jekardah",
        country: "indonesia",
        postal_code: "1234312",
      });
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it("should unable to put data coz user doesn't input needed field", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)

      .set("X-API-TOKEN", "test")
      .send({
        country: "",
        postal_code: "",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to delete address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
  it("should unable to delete address coz wrong contact id", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should unable to delete address coz wrong address id", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe('List"/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)"', () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });
  it("should unable to list address coz wrong contactId", async () => {
    const contact = await ContactTest.get();

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it("should be to list address", async () => {
    const contact = await ContactTest.get();

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });
});
