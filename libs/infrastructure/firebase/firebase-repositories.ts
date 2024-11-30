import { Reservation } from '../../domain/entities/reservation';
import { ParkingSpot } from '../../domain/entities/parking-spot';
import { ParkingSpotRepository } from '../../domain/repositories/parking-spot.repository';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import { EventBusType } from '../../domain/events/event-bus';
import { ReservationListUpdatedEvent } from '../../domain/events/ReservationListUpdatedEvent';
import { ParkingSpotListUpdatedEvent } from '../../domain/events/ParkingSpotListUpdatedEvent';

const firebaseConfig = {
  apiKey: "AIzaSyCGaPJCpOVkvalcAcGLZoMimZOVgTGnwBM",
  authDomain: "car-parking-dev.firebaseapp.com",
  projectId: "car-parking-dev",
  storageBucket: "car-parking-dev.firebasestorage.app",
  messagingSenderId: "572317372334",
  appId: "1:572317372334:web:9aff6cde163246b2c9823f"
};

export class FirebaseParkingSpotRepository implements ParkingSpotRepository {
  private readonly PARKING_SPOTS_COLLECTION_NAME: string = 'parkingSpots';
  
  private db: Firestore;
  private parkingSpots: ParkingSpot[] = [];

  constructor(private readonly eventBus: EventBusType) {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);

    if (!this.isSSR()) {
      const parkingSpotsCollection = collection(this.db, this.PARKING_SPOTS_COLLECTION_NAME);
      onSnapshot(parkingSpotsCollection, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const doc = change.doc;
            this.parkingSpots.push(new ParkingSpot(doc.id, doc.get('number')));

            this.eventBus.publish(new ParkingSpotListUpdatedEvent());
          }
          if (change.type === 'modified') {
            throw new Error('Modified parking spot not implemented.');
          }
          if (change.type === 'removed') {
            throw new Error('Removed parking spot not implemented.');
          }
        });
      });
    }
  }
  
  findById(id: string): ParkingSpot | null {
    return this.findAll().find((s) => s.id === id) || null;
  }

  findAll(): ParkingSpot[] {
    // https://ng.ant.design/components/table/en#note
    return [...this.parkingSpots];
  }

  private isSSR(): boolean {
    return typeof window === 'undefined';
  }
}

export class FirebaseReservationRepository implements ReservationRepository {
  private readonly RESERVATIONS_COLLECTION_NAME: string = 'reservations';

  private db: Firestore;
  private reservations: Reservation[] = [];

  constructor(private readonly eventBus: EventBusType) {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);

    if (!this.isSSR()) {
      const reservationsCollection = collection(
        this.db,
        this.RESERVATIONS_COLLECTION_NAME
      );
      onSnapshot(reservationsCollection, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const doc = change.doc;
            this.reservations.push(
              new Reservation(
                doc.get('parkingSpotId'),
                doc.get('user'),
                new Date(doc.get('date').toDate()),
                doc.id
              )
            );

            this.eventBus.publish(new ReservationListUpdatedEvent());
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

  save(reservation: Reservation): void {
    try {
      const reservations = collection(
        this.db,
        this.RESERVATIONS_COLLECTION_NAME
      );

      addDoc(reservations, {
        user: reservation.user,
        date: reservation.date,
        parkingSpotId: reservation.spotId,
      });
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }

  findById(id: string): Reservation | null {
    return (
      this.reservations.find((reservation) => reservation.id === id) || null
    );
  }

  findAll(): Reservation[] {
    return this.reservations;
  }

  findByParkingSpotId(parkingSpotId: string): Reservation[] {
    return this.reservations.filter(
      (reservation) => reservation.spotId === parkingSpotId
    );
  }

  findByParkingSpotIdAndDate(parkingSpotId: string, date: Date): Reservation[] {
    return this.reservations.filter(
      (reservation: Reservation) =>
        reservation.spotId === parkingSpotId &&
        this.sameDay(reservation.date, date)
    );
  }

  private isSSR(): boolean {
    return typeof window === 'undefined';
  }

  private sameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
}
