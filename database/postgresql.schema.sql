CREATE TABLE public.photos
(
    "photoId" serial NOT NULL,
    "photoUrl" text NOT NULL,
    alt text,
    username text NOT NULL,
    "experienceId" integer NOT NULL,
    PRIMARY KEY ("photoId")
);

ALTER TABLE public.photos
    OWNER to postgres;