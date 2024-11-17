import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, getDocs, addDoc, CollectionReference, DocumentData, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGaPJCpOVkvalcAcGLZoMimZOVgTGnwBM",
  authDomain: "car-parking-dev.firebaseapp.com",
  projectId: "car-parking-dev",
  storageBucket: "car-parking-dev.firebasestorage.app",
  messagingSenderId: "572317372334",
  appId: "1:572317372334:web:9aff6cde163246b2c9823f"
};

export class FirebaseDataProvider implements ParkingSpotsPort, ReservationsPort {
  private readonly PARKING_SPOTS_COLLECTION_NAME: string = 'parkingSpots';
  private readonly RESERVATIONS_COLLECTION_NAME: string = 'reservations';

  private db: Firestore;
  private parkingSpots: ParkingSpotEntity[] = [];
  private reservations: ReservationEntity[] = [];

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
    
    if (!this.isSSR()) {
      const parkingSpotsCollection = collection(this.db, this.PARKING_SPOTS_COLLECTION_NAME);
      onSnapshot(parkingSpotsCollection, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const doc = change.doc;
            this.parkingSpots.push(new ParkingSpotEntity(doc.id, doc.get('number')));
            // reassign to trigger change detection in Angular
            // yep, this is a hack
            this.parkingSpots = [...this.parkingSpots];
          }
          if (change.type === 'modified') {
            throw new Error('Modified parking spot not implemented.');
          }
          if (change.type === 'removed') {
            throw new Error('Removed parking spot not implemented.');
          }
        });
      });

      const reservationsCollection = collection(this.db, this.RESERVATIONS_COLLECTION_NAME);
      onSnapshot(reservationsCollection, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const doc = change.doc;
            this.reservations.push(
              new ReservationEntity(doc.get('parkingSpotId'), doc.get('user'), new Date(doc.get('date').toDate()), doc.id))
          }
          if (change.type === 'modified') {
            throw new Error('Modified reservation not implemented.');
          }
          if (change.type === 'removed') {
            throw new Error('Removed reservation not implemented.');
          }
        });
      });
    }
  }

  getAllReservations(): ReservationEntity[] {
    return this.reservations;
  }

  get(id: string): ReservationEntity | null {
    return this.reservations.find(reservation => reservation.id === id) || null;
  }

  add(reservation: ReservationEntity): void {
    try {
      const reservations = collection(this.db, this.RESERVATIONS_COLLECTION_NAME);
  
      addDoc(reservations, {
        user: reservation.user,
        date: reservation.date,
        parkingSpotId: reservation.spotId
      });
    } catch (error) {
      console.error('Error adding document:', error);
    }
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

  private isSSR(): boolean {
    return typeof window === 'undefined';
  }
}
