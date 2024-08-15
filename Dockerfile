FROM eclipse-temurin:latest
WORKDIR /app
COPY target/sa-backend-0.0.1-SNAPSHOT.jar avis.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "avis.jar"]