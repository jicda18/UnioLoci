import { DeleteDateColumn } from 'typeorm';
import { AuditableEntity } from './auditable.entity';

export abstract class SoftDeleteableEntity extends AuditableEntity {
  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at?: Date;
}
