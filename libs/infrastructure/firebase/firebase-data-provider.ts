import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';

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

  async getAllParkingSpots(): Promise<ParkingSpotEntity[]> {
    console.log('Getting parking spots from Firebase');
    const parkingSpots = collection(db, 'parkingSpots');
    const parkingSpotsSnapshot = await getDocs(parkingSpots);
    const parkingSpotsList = parkingSpotsSnapshot.docs.map(
      doc => new ParkingSpotEntity(doc.id, doc.get('number')));
    
    return parkingSpotsList;
  }

  async getByParkingSpotId(id: string): Promise<ReservationEntity[]> {
    console.log('Getting reservations from Firebase');
    const reservations = collection(db, 'reservations');
    const parkingSpotIdQuery = query(reservations, where('parkingSpotId', '==', id));
    const reservationsSnapshot = await getDocs(parkingSpotIdQuery);
    const reservationsList = reservationsSnapshot.docs.map(
      doc => new ReservationEntity(doc.id, doc.get('user'), doc.get('date'), doc.get('parkingSpotId')));
    
    return reservationsList;
  }
}
