import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs, query, where, QuerySnapshot, DocumentData } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCGaPJCpOVkvalcAcGLZoMimZOVgTGnwBM",
  authDomain: "car-parking-dev.firebaseapp.com",
  projectId: "car-parking-dev",
  storageBucket: "car-parking-dev.firebasestorage.app",
  messagingSenderId: "572317372334",
  appId: "1:572317372334:web:9aff6cde163246b2c9823f"
};

export class FirebaseDataProvider implements ParkingSpotsPort, ReservationsPort {
  private parkingSpots: ParkingSpotEntity[] = [];
  private reservations: ReservationEntity[] = [];

  constructor() {
    console.log('Initializing Firebase');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('Getting parking spots from Firebase');
    const parkingSpots = collection(db, 'parkingSpots');

    getDocs(parkingSpots).then(parkingSpots => {
      this.parkingSpots = parkingSpots.docs.map(
        doc => new ParkingSpotEntity(doc.id, doc.get('number'))
      );
    });

    console.log('Getting reservations from Firebase');
    const reservations = collection(db, 'reservations');
    getDocs(reservations).then(reservations => {
      this.reservations = reservations.docs.map(
        doc => new ReservationEntity(doc.id, doc.get('user'), new Date(doc.get('date')), doc.get('parkingSpotId')));
    });
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
    return this.parkingSpots;
  }

  getByParkingSpotId(id: string): ReservationEntity[] {
    return this.reservations.filter(reservation => reservation.spotId === id);
  }
}
