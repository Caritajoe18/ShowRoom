import dotenv from 'dotenv';
dotenv.config()
import request from "supertest";
import app from "../app";
import mongo from "mongoose";
import { Movies } from "../model/showRoom";
import { User } from "../model/user";
import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcryptjs";
import { getMovies } from '../controller/showRoom';
import jwt from 'jsonwebtoken';


let mongoServer: any

const dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = await mongoServer.getUri();
  await mongo.connect(uri);
};
//const randomString = Math.random();

beforeEach(async () => {
  const collection = await mongo.connection.db.collections();
  collection.map(async (collection: any) => {
    await collection.deleteMany();
  });
});

const dbDisconnect = async () => {
  await mongo.connection.dropDatabase();
  await mongo.connection.close();
  await mongoServer.stop();
};

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());


describe("Movies", () => {
    test("if fullname is empty", async () => {
      const randomString = Math.random().toString(36).substring(7);
  
      const user = {
        fullname: "",
        username: "caribaby",
        email: `user-${randomString}@gmail.com`,
        password: bcrypt.hashSync("12345", bcrypt.genSaltSync()),
        confirm_password: "12345",
      };
  
      const res = await request(app).post("/users/Register").send(user);
  
      expect(res.status).toBe(400);
      expect(res.body.Error).toEqual(" fullname  is not allowed to be empty");
    });

    
  test('should retrieve all movies from the database', async () => {
    const response = await request(app).get('/movies/get_movies');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('msg', 'You have all your movie');
    expect(response.body).toHaveProperty('getAllMovies');
    expect(Array.isArray(response.body.getAllMovies)).toBe(true);
  });
  

  test('should delete a movie from the database', async () => {

    const sampleMovie = await Movies.create({
      title: 'Avengers',
      description: 'Action',
      image: 'Avengers-image.jpg',
      price: 5000,
    });

    const response = await request(app).delete(`/movies/delete_movies/${sampleMovie._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('msg', 'You have deleted your movie');

    const deletedMovie = await Movies.findById(sampleMovie._id);
    expect(deletedMovie).toBeNull();
  });

  test('should return 400 if movie data is updated with empty string', async () => {
    const sampleMovie = await Movies.create({
      title: 'Test Movie',
      description: 'Test Description',
      image: 'test-image.jpg',
      price: 1000,
    });

    const invalidData = {
      title: '', // Invalid data that would fail validation
    };

    const response = await request(app)
      .patch(`/movies/update_movies/${sampleMovie._id}`)
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', ' title  is not allowed to be empty');
  });

});





