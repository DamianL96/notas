import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(withFetch()),

    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'notas-e5c09',
        appId: '1:615468838234:web:cc40c01af266c878b4d763',
        storageBucket: 'notas-e5c09.firebasestorage.app',
        apiKey: 'AIzaSyDI3mmMQREBnb7cF6WvCyJAkxJ4VqJDjeE',
        authDomain: 'notas-e5c09.firebaseapp.com',
        messagingSenderId: '615468838234',
        measurementId: 'G-G47115ZY78',
      })
    ),

    provideFirestore(() => getFirestore()),
  ],
};
