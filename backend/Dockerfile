FROM maven:3.8.6-eclipse-temurin-17 AS build

WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /workspace/target/*.jar web-0.0.1-SNAPSHOT.jar
EXPOSE 3210
CMD ["java", "-jar", "web-0.0.1-SNAPSHOT.jar"]