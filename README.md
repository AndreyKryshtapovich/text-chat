# Chat Application
Project designed and implemented for master's degree course "Enterprise Software Engineering" at Belarussian State University by Andrei Kryshtapovich and Maryia Bystrova.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequirements
Installed Maven (for command line usage).
Installed npm and Node.js

### Installing
Build an executable .jar file using Maven:
```
mvn clean install
```
Run the server from /target directory using:
```
java -jar YOUR_JAR_FILE
```
or build and run the server using your IDE.

Then run from /client folder:
```
npm install
```
Start front-end server using:
```
npm start
```
## Running the tests
Run all the unit test classes:
```
mvn test
```

## Patterns used
* Dependency injection and inversion of control. Spring Beans are injected into Spring IOC container which is responsible for the objects creation, wiring the objects together, configuring these objects and handling their entire lifecycle.
* Proxy pattern. This is a structural pattern that is used by Spring framework to generate special objects to interface the functionality of inner objects to the outer world.
* Front Controller Design pattern. The front controller design pattern is a technique in software engineering to implement centralized request handling mechanism which is capable of handling all the requests through a single handler. Spring framework provides support for the DispatcherServlet that ensure to dispatch an incoming request to your controllers.
* Singleton. All Spring Bean are singletons by default. Only one intance of these classes is created.
* Factory. Used for loading beans through BeanFactory and Application context.

 ## Technologies used
 
* **[Java](https://www.oracle.com/technetwork/java/javase/documentation/index.html)**
* **[Spring Boot](http://spring.io/projects/spring-boot)**
* **[Sockjs](https://github.com/sockjs/sockjs-client)**
* **[JUnit](https://junit.org/junit5/)**
* **[ReactJS](https://reactjs.org/)**
* **[Material-UI](https://material-ui.com/)**

## Authors

* **Andrei Kryshtapovich**
* **Maryia Bystrova**
