# BOARDIFY

![Capture d'écran de l'application](home.PNG)


## How to run 🛠️

 * ``` git clone https://github.com/AmbroiseM/BOARDIFY.git ```

 * ``` docker-compose up --build ```


You should have 4 accounts already when building the docker compose (don't judge me okayy 😂):
 + Admin (admin@boardify.fr)
 +  Taylor Swift (taylors@boardify.fr)
 +  James Harden (jamesj@boardify.fr)
 +  Jackie Chan (jackieh@boardify.fr)

   
They all have the same password (1234) except the admin where you can put anything you want . 

If you can't connect, you will have to insert manually the admin or anyone you want. Open a new terminal and enter : 

1) ``` docker-compose exec db psql -U postgres -d postgres ```
2) ``` \c my_kanboard  ```
3) ``` INSERT INTO "user" (email, password, "firstName", "lastName", role) VALUES ('admin@boardify.fr', 'password', 'admin', 'admin', 'DIRECTOR'); ```
4) ``` insert into "public"."project" ("description", "managerId", "name") values ('Description', 1, 'Boardify'); ```
5) ``` UPDATE "user" SET project_id = 1 WHERE email = 'admin@boardify.fr'; ```

And you should be good to go 🚀 

## 🤝 Contribution
If anyone comes across this repo and sees something that can be improved in the code, please feel free to open a pull request or open an issue 😊
