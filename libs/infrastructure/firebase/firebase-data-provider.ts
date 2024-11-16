import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAMPJHHB8b7aqsgMc6T2dAHuq-Nv06lEVg',
  authDomain: 'car-parking-51799.firebaseapp.com',
  projectId: 'car-parking-51799',
  storageBucket: 'car-parking-51799.firebasestorage.app',
  messagingSenderId: '1060641640680',
  appId: '1:1060641640680:web:7793dcb0ec1981ca95795d',
  measurementId: 'G-W9M3G8FN00',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export class FirebaseDataProvider implements ParkingSpotsPort, ReservationsPort {
  constructor() {
    console.log('Firebase initialized');
  }

  getAllReservations(): ReservationEntity[] {
    throw new Error('Method not implemented.');
  }

  get(id: string): ReservationEntity | null {
    throw new Error('Method not implemented.');
  }

  add(reservation: ReservationEntity): void {
    throw new Error('Method not implemented.');
  }

  remove(reservation: ReservationEntity): void {
    throw new Error('Method not implemented.');
  }

  getAllParkingSpots(): ParkingSpotEntity[] {
    throw new Error('Method not implemented.');
  }
}
