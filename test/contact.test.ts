import { web } from "./../src/application/web";
import supertest from "supertest";
import { ContactTest, UserTest } from "./test-utils";
import { logger } from "../src/application/logging";
describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });
  it("should create new contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "farhan",
        last_name: "ramadan",
        email: "farhan@example.com",
        phone: "085157542121",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.first_name).toBe("farhan");
    expect(response.body.data.last_name).toBe("ramadan");
    expect(response.body.data.email).toBe("farhan@example.com");
    expect(response.body.data.phone).toBe("085157542121");
  });
  it("should reject create new contact when it's empty", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "farhan",
        phone: "1240971234587321857138495731",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET Contact", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined;
    expect(response.body.data.first_name).toBe(contact.first_name);
    expect(response.body.data.last_name).toBe(contact.last_name);
    expect(response.body.data.email).toBe(contact.email);
    expect(response.body.data.phone).toBe(contact.phone);
  });
  it("should not be able get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.error).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });
  it("should be able to update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "farhan0212",
        last_name: "ramadan0212",
        email: "rmdn@example.com",
        phone: "124890712",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(contact.id);
    expect(response.body.data.first_name).toBe("farhan0212");
    expect(response.body.data.last_name).toBe("ramadan0212");
    expect(response.body.data.email).toBe("rmdn@example.com");
    expect(response.body.data.phone).toBe("124890712");
  });

  it("shouldn't be able to update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "rmd.com",
        phone: "",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.error).toBeDefined();
  });
});

describe("DELETE /api/contacts/:ContactID", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able remove contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("ok");
  });

  it("shouldn't remove contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("get /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be succes get contacts", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be succes get contacts by name", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "es",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });
  it("should be succes get contacts by email", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        email: ".com",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be succes get contacts by phone", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        phone: "40",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("shoudn't success get contact coz wrong name", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        page: 2,
        size: 1,
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(2);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(1);
  });
});
