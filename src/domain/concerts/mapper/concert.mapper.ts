import { SessionEntity } from 'src/common/entity/session.entity';
import { Concert } from '../model/concert';

export class ConcertMapper {
  static toDomain(session: SessionEntity): Concert {
    const { id, concertId, date, avaliableSeats } = session;

    return new Concert(concertId, id, date, avaliableSeats);
  }

  static toDomainList(sessions: SessionEntity[]): Concert[] {
    return sessions.map((session) => this.toDomain(session));
  }
}
