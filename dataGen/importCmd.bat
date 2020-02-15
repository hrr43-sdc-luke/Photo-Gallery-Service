@echo .
@echo PostgreSQL 12 does not import large files directly on Windows 10 (). Workarounds include
@echo installing PostgreSQL 10 as well as using something like the command below, which uses
@echo 7zip and a compressed file. Instead of 7zip, you can do something like FROM PROGRAM
@echo 'cmd /c "type data.csv" CSV HEADER NULL ''
@echo Note the '' at the end of the command. I don't know what it does, but it will fail
@echo without it
@echo .
@echo %time%
psql -d guestphotos -U postgres --command "\copy public.photos (\"photoUrl\", alt, username, \"experienceId\") FROM PROGRAM '7z e -so C:\Users\Kraig\DOCUME~1\GitHub\PHOTO-~1\dataGen\tail.7z' CSV HEADER NULL ''"
@echo %time%