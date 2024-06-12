import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from 'bcrypt';
import mongoose from "mongoose";
import * as request from "supertest";
import { database, imports } from "./constant";
import { productMock } from "./mocks/product";
import { userMock } from './mocks/user';

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.useDb("e2e").collection("products").deleteMany({});
  await mongoose.connection.useDb("e2e").collection("users").deleteMany({});
  const db = mongoose.connection.useDb("e2e");

  await db.collection("users").insertOne({
    email: userMock.email,
    password: await bcrypt.hash(userMock.password, 10),
  }).then((res) => {
    console.info("User created");
  })
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Product (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports,
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  const getToken = async (): Promise<string> => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    const res = await request(app.getHttpServer())
      .post("/auth/signin")
      .send({
        email: userMock.email,
        password: userMock.password,
      });
    return res.body.token;
  }

  it("/products (POST) 201", async () => {
    const token = await getToken();
    return request(app.getHttpServer())
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send(productMock)
      .expect(HttpStatus.CREATED).catch(err => {
        console.info(err);
      })
  });

  it("/products (GET) 200", async () => {
    const token = await getToken();
    return request(app.getHttpServer())
      .get("/products")
      .set("Authorization", `Bearer ${token}`)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.total).toBe(1);
        expect(body.data).toBeInstanceOf(Array);
      });
  });
});
