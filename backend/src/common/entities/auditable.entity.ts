import { CreateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class AuditableEntity extends BaseEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
