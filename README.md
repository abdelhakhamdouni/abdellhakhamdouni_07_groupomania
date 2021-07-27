Groupomania
Un site web en guise de réseau social pour les salaries, afin d'ameliorer leur conditions de travail.

Présentation: https://abdelhakhamdouni.github.io/abdellhakhamdouni_07_groupomania/presentation.gif

Installation
le projet et devisé en deux parties, Backend et Frontend chaque partie est independante de l'autre

pour l'installation du serveur et la configuration de la base de donnée:

La configuration du .env
- Accedez au fichier .env
- Renseignez les identifiants de connexion a la base de donnée
    -> host
    -> user
    -> password
-Renseignez une phrase de chiffrage du token, 64 caractéres ou plus.
Configuration de la base de donnée
//dans la base de donnée créer une base appelée groupomania et importer le fichier nome groupomaniaDb.sql
cette procédure permet d'avoir une base de donnée conforme pour le projet, avec des publications, commentaires et likes 
pour le teste de l'applications
Installation et lancement du backend
Vous devez avoir NodeJs installé sur votre machine, en version 14 ou plus: Accedez au prjet:

cd ./frontend/
npm install
npm start
Installation et lancement du frontend
Pour installer lancer le projet en frontend sans le compiler, ouvrir une nouvelle fenetre du terminal Accedez au projet:

cd ./frontend
npm install
npm start
Utilisation du site
Accedez ensuite au site sur la page

http://localhost:3000
Cliquer sur le bouton créer un compte dans la page de connexion, remplir le formulaire en choisissant un avatar. et valider.
Vous serez redérigé vers la page de connexion ensuite.
Le site est optimisé pour une utilisation sur mobile

If you have an existing database and you want to add support:

ALTER DATABASE database_name CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
You also need to set the correct character set and collation for your tables:

CREATE TABLE IF NOT EXISTS table_name (
    ...
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
or change it if you've got existing tables with a lot of data:

ALTER TABLE table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
