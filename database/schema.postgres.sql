-- Table: public.photos

-- DROP TABLE public.photos;

CREATE TABLE public.photos
(
    "photoId" integer NOT NULL DEFAULT nextval('"photos_photoId_seq"'::regclass),
    "photoUrl" text COLLATE pg_catalog."default" NOT NULL,
    alt text COLLATE pg_catalog."default",
    username text COLLATE pg_catalog."default",
    "experienceId" integer NOT NULL,
    CONSTRAINT photos_pkey PRIMARY KEY ("photoId")
)

TABLESPACE pg_default;

ALTER TABLE public.photos
    OWNER to postgres;