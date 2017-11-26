INITIAL SETUP
---
1. YOU MUST CREATE A MYSQL DATABASE
  * "CREATE TABLE Users (Id int NOT NULL AUTO_INCREMENT, Username VARCHAR(35) NOT NULL UNIQUE, Password VARCHAR(35) NOT NULL, PRIMARY KEY (Id));"
  * "INSERT INTO Users VALUES(NULL,'Admin','Password');"
2. YOU MUST CHANGE "template.api.properties" to "api.properties"
3. YOU MUST MODIFY "api.properties"
  * MODIFY THE "db.*" PROPERTIES TO POINT TO YOUR DATABASE
  * MODIFY THE "jwt.secret" TO ANY VAlID SECRET (check out jsonwebtoken api)

TESTING
---
1. RUN THE APPLICATION
  * > npm start
2. VERIFY THE SERVICES "/public/*" WORK
  * USING SOME RESTful TESTING TOOL (I use Postman)
    * POST TO ADDRESS: "http://localhost:3000/public/login" WITH THE JSON OBJECT:
      * {username:'Admin', password:'Admin'}
      * THIS RETURNS A JSON OBJECT CONTAINING A TOKEN VALUE in "content"."token"
    * ADD HEADER "Authorization" AND SET ITS VALUE TO "Bearer xxx" WHERE 'xxx' IS THE ABOVE TOKEN VALUE
    * DELETE TO ADDRESS: "http://localhost:3000/private/update"
      * THIS WILL DELETE THE USER THAT HAD GIVEN THE SPECIFIED TOKEN