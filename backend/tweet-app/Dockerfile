# BUILD STAGE
FROM maven:3.8-jdk-8 as maven_build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn -f /app/pom.xml clean package -Dmaven.test.skip

# RUN STAGE
FROM java:8-jre-alpine
WORKDIR /app
COPY --from=maven_build /app/target/*.jar tweetapp.jar
EXPOSE 8099
CMD ["java","-jar","tweetapp.jar"]