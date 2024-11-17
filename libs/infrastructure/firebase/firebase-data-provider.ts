import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

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
    console.log('Initializing Firebase');
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
    
    console.log('Getting parking spots from Firebase');
    const parkingSpots = collection(this.db, this.PARKING_SPOTS_COLLECTION_NAME);

    getDocs(parkingSpots).then(parkingSpots => {
      this.parkingSpots = parkingSpots.docs.map(
        doc => new ParkingSpotEntity(doc.id, doc.get('number'))
      );
    });

    console.log('Getting reservations from Firebase');
    const reservations = collection(this.db, this.RESERVATIONS_COLLECTION_NAME);
    getDocs(reservations).then(reservations => {
      this.reservations = reservations.docs.map(
        doc => new ReservationEntity(doc.get('parkingSpotId'), doc.get('user'), new Date(doc.get('date').toDate()), doc.id)
      );
    });
  }

  getAllReservations(): ReservationEntity[] {
    throw new Error('Method not implemented.');
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
}
