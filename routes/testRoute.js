import express from 'express';
import { shouldBeLoggedIn, shouldBeAdmin } from '../controllers/testController.js';

const testRoute = express.Router();

testRoute.get('/should-be-logged-in', shouldBeLoggedIn);
testRoute.get('/should-be-admin', shouldBeAdmin);

export default testRoute;