export class Concert {
  constructor(
    public id: number,
    public sessionId: number,
    public date: Date,
    public avaliableSeats: number,
  ) {}
}
