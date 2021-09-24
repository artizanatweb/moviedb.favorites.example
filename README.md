## Requirements

<p>Application that connects to <a href="https://developers.themoviedb.org/3/getting-started/introduction">The Movie Database API</a> and allows searching for movies by name, save favorite movies to the local db, show a list with the favorite movies and presents details about a movie.</p>
<p>Pages:</p>
<ol>
    <li>Home page with search field, list results and paginator.</li>
    <li>Favorite movies listed in a table with pagination and search by title.</li>
    <li>Movie details - page to display movie details and poster image.</li>
</ol>

## Demo

<p>
    :link: Functional demo is <a href="https://moviedb.artizanatweb.ro">available here</a>.
</p>

## Technologies used

<p>:gear: Backend:</p>
<ul>
    <li><b>Laravel 8</b> REST API</li>
    <li>MySQL database</li>
</ul>
<br />
<p>:tv: Frontend:</p>
<ul>
    <li><b>React 17</b></li>
    <li>Redux</li>
    <li>Material UI</li>
</ul>
<p>
    The <b>ReactJS</b> application can be found in <b>/resources/js/</b>.<br />
    It serves as an example to show that I am accustomed with both programming styles: <b>functional based components</b> with <b>hooks</b> and <b>class based components</b>.<br />
    Global state is managed by <b>Redux</b> and can be found in <b>/resources/js/stores/</b>.
</p>

## Installation

Create database:
<pre>
mysql> create database moviedb_favorites;
</pre>
<br />
Copy file .env.example to .env
<pre>
$ cp .env.example .env
</pre>
and edit .env file based on your settings: <br />
- database: DB_USERNAME, DB_PASSWORD <br />
- main user: <b>ADMIN_CREDENTIALS_EMAIL</b>; <b>ADMIN_CREDENTIALS_PASSWD</b> <br />
<br />
You need an API key from the website <a href="https://developers.themoviedb.org/3/getting-started/introduction">The Movie Database</a> and save it in the .env file:
<br />
- "The Movie Database (TMDB) API" - api key: <b>MOVIEDB_KEY</b>
<br />
<br />
Copy the virtual host file from /debian/ to your apache directory.
<pre>
$ cp -fr debian/moviedb.favorites.localhost.conf /etc/apache2/sites-available/
</pre>
Change file /etc/apache2/sites-available/moviedb.favorites.localhost.conf with your paths.<br />
<br />
Activate the virtual host and reload apache:
<pre>
$ sudo a2ensite moviedb.favorites.localhost.conf
$ sudo systemctl reload apache2
</pre> 
Apache <b>mod_rewrite</b> must be enabled ($ sudo a2enmod rewrite)
<br />
<br />
Add the following line to your <b>/etc/hosts</b>:
<pre>
127.0.1.1	moviedb.favorites.localhost
</pre>
<br />
Install dependencies using composer:
<pre>
$ composer install
</pre>
<br />
Set the application key:
<pre>
$ php artisan key:generate
</pre>
<br />
Run DB migration:
<pre>
$ php artisan migrate
</pre>
<br />
Install front-end dependencies:
<pre>
$ npm install
</pre>
<br />
Generate a production build:
<pre>
$ npm run prod
</pre>
