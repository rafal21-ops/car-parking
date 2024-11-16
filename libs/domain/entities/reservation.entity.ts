export class ReservationEntity {

  constructor(private readonly _id: string, private readonly _user: string, private readonly _date: Date) {}


  get id() {
    return this._id;
  }

  get user() {
    return this._user;
  }

  get date() {
    return this._date;
  }

}