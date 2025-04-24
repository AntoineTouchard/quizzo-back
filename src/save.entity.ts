import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Save')
export class Save {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('longtext', { name: 'data', nullable: true })
  data: string | null;
}
