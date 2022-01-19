import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from "@nestjs/common";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

dotenv.config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn']
  });

  // TODO: (temporary) to make it work locally
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true
  }));

  initDatabase();

  await app.listen(process.env.PORT);
}
bootstrap();


function initDatabase() {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  const app = initializeApp(firebaseConfig);
  getDatabase(app);
}
