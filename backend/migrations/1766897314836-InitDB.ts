import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1766897314836 implements MigrationInterface {
    name = 'InitDB1766897314836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "magic_links" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tokenHash" character(128) NOT NULL, "actionType" character varying(16) NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "usedAt" TIMESTAMP WITH TIME ZONE, "userId" uuid NOT NULL, CONSTRAINT "pk_magic_links_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_magic_links_token_hash" ON "magic_links" ("tokenHash") `);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tokenHash" character(128) NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "pk_sessions_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_sessions_token_hash" ON "sessions" ("tokenHash") `);
        await queryRunner.query(`CREATE TABLE "calendar_members" ("userId" uuid NOT NULL, "calendarId" uuid NOT NULL, "reminderMinutesBefore" integer NOT NULL DEFAULT '30', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "pk_calendar_members_user_id" PRIMARY KEY ("userId", "calendarId"))`);
        await queryRunner.query(`CREATE TABLE "event_logs" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "action" character varying NOT NULL, "changes" jsonb NOT NULL, "eventId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "pk_event_logs_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "description" text, "startAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endAt" TIMESTAMP WITH TIME ZONE NOT NULL, "calendarId" uuid NOT NULL, CONSTRAINT "pk_events_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calendars" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "isPublic" boolean NOT NULL DEFAULT false, "creatorId" uuid NOT NULL, CONSTRAINT "pk_calendars_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "email" character varying NOT NULL, "name" character varying, "aiRequestsBalance" integer NOT NULL DEFAULT '50', CONSTRAINT "pk_users_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_users_email" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "magic_links" ADD CONSTRAINT "fk_magic_links_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "fk_sessions_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendar_members" ADD CONSTRAINT "fk_calendar_members_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendar_members" ADD CONSTRAINT "fk_calendar_members_calendar" FOREIGN KEY ("calendarId") REFERENCES "calendars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_logs" ADD CONSTRAINT "fk_event_logs_event" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_logs" ADD CONSTRAINT "fk_event_logs_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "fk_events_calendar" FOREIGN KEY ("calendarId") REFERENCES "calendars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendars" ADD CONSTRAINT "fk_calendars_creator" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" DROP CONSTRAINT "fk_calendars_creator"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "fk_events_calendar"`);
        await queryRunner.query(`ALTER TABLE "event_logs" DROP CONSTRAINT "fk_event_logs_user"`);
        await queryRunner.query(`ALTER TABLE "event_logs" DROP CONSTRAINT "fk_event_logs_event"`);
        await queryRunner.query(`ALTER TABLE "calendar_members" DROP CONSTRAINT "fk_calendar_members_calendar"`);
        await queryRunner.query(`ALTER TABLE "calendar_members" DROP CONSTRAINT "fk_calendar_members_user"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "fk_sessions_user"`);
        await queryRunner.query(`ALTER TABLE "magic_links" DROP CONSTRAINT "fk_magic_links_user"`);
        await queryRunner.query(`DROP INDEX "public"."idx_users_email"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "calendars"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "event_logs"`);
        await queryRunner.query(`DROP TABLE "calendar_members"`);
        await queryRunner.query(`DROP INDEX "public"."idx_sessions_token_hash"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP INDEX "public"."idx_magic_links_token_hash"`);
        await queryRunner.query(`DROP TABLE "magic_links"`);
    }

}
