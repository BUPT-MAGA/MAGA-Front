@REM yarn build && ^
docker build -f "Dockerfile" -t zebgou/maga-front:latest . && ^
docker push zebgou/maga-front:latest

@REM ssh root@123.60.215.79