import request from 'supertest';
import app from '../app';
import mongo from 'mongoose';
import {User} from '../model/user'
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from "bcryptjs";

let mongoServer: any;


const dbConnect = async()=>{
    mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    await mongo.connect(uri);
}
 const randomString = Math.random()

beforeEach(async()=>{
    const collection = await mongo.connection.db.collections();
    collection.map(async(collection:any)=>{
      await collection.deleteMany()
    })
})

const dbDisconnect = async()=>{
    await mongo.connection.dropDatabase()
    await mongo.connection.close()
    await mongoServer.stop()
}

beforeAll (async()=> dbConnect())
afterAll(async()=> dbDisconnect())


describe('User Registration', () => {
  test('should register a user', async () => {
    const response = await request(app)
      .post('/users/Register')
      .send({
        fullname: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password:'Pp12345',
        confirm_password: 'Pp12345',
      });
      
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('msg', 'user created successfully');
    expect(response.body).toHaveProperty('newUser');
  });

  test('should return 400 if email is empty', async () => {
    // Assuming you have a user with the same email already registered
    const response = await request(app)
      .post('/users/Register')
      .send({
        fullname: 'Jane Doe',
        username: 'janedoe',
        email: '',
        password:'Pp12345',
        confirm_password: 'Pp12345',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('Error',
    ' email  is not allowed to be empty');
  });

  test('should return 400 if validation fails', async () => {
    const response = await request(app)
      .post('/users/Register')
      .send({
        fullname: '', // Assuming fullname is a required field
        username: 'johndoe',
        email: 'john@example.com',
        password:bcrypt.hashSync('12345', bcrypt.genSaltSync()),
        confirm_password: '12345',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'Error',
      ' fullname  is not allowed to be empty'
    );
  });
});





describe('User Login', () => {

  test('should return 400 if email is not provided', async () => {
    const response = await request(app)
      .post('/users/Login')
      .send({
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', ' email  is required');
  });

  test('should return 400 if password is not provided', async () => {
    const response = await request(app)
      .post('/users/Login')
      .send({
        email: 'test@example.com',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', ' password  is required');
  });


  test('should return 400 if email is empty', async () => {
    const response= await request(app)
      .post('/users/Login')
      .send({
        email: '',
        password: '12345',
      });
      console.log(response.body)

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error',' email  is not allowed to be empty');
  });
});
