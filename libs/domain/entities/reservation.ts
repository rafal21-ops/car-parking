export class Reservation {
  constructor(
    private readonly _spotId: string,
    private readonly _user: string,
    private readonly _date: Date,
    private readonly _id: string
  ) {}

  get id() {
    return this._id;
  }

  get user() {
    return this._user;
  }

  get date() {
    return this._date;
  }

  get spotId() {
    return this._spotId;
  }
}
