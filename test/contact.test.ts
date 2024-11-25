import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { ContactTest, UserTest } from "./test-utils";

describe('POST "/api/contacts"', () => {
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
      .set("X-API-Token", "test")
      .send({
        first_name: "farhan",
        last_name: "ramadan",
        email: "farhan@example.com",
        phone: "085157542121",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("farhan");
    expect(response.body.data.last_name).toBe("ramadan");
    expect(response.body.data.email).toBe("farhan@example.com");
    expect(response.body.data.phone).toBe("085157542121");
  });
  it("should reject when firstname is empty", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-Token", "test")
      .send({
        first_name: "",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
