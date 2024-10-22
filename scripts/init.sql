
INSERT INTO "user" (email, password, "firstName", "lastName", role) VALUES ('admin@boardify.fr', 'password', 'admin', 'admin', 'DIRECTOR');
insert into "public"."project" ("description", "managerId", "name") values ('Description', 1, 'Boardify');
UPDATE "user" SET project_id = 1 WHERE email = 'admin@boardify.fr';