import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column('varchar', { comment: '사용자 이름' })
  name: string;
}
