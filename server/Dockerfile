FROM openjdk:17-jdk-oracle

WORKDIR /app

COPY target/server-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]