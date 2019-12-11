FROM openjdk:8-jre-alpine
COPY /target/PRIDEAchievements-0.0.1-SNAPSHOT.jar /usr/app/
CMD java -jar /usr/app/PRIDEAchievements-0.0.1-SNAPSHOT.jar
EXPOSE 8761