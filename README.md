# Zwallet Backend API
  Project ini berisi Restful API yang saya buat menggunakan **express js** dan dengan database **mysql**, project ini adalah lanjutan dari project sebelumnya yaitu zwallet app, yang merupakan ui nya, dan di sini adalah backend nya.

## Apa itu Otentikasi? lalu Otorisasi?
  Otentikasi adalah proses memverifikasi sebuah identitas apakah dia sesuai dengan yang ditentukan atau tidak, lalu, Otorisasi adalah sebuah hak akses yang mengatur siapa saja yang boleh mengakses sesuatu dalam konteks ini adalah halaman. dan disini, ada 2 buah Role untuk Otorisasi, 1. Admin yang mampu melakukan segalanya (CRUD) dan juga 2. User Yang hanya mampu Read dan CU untuk data nya sendiri

## Tools

* **JWT**
  JWT (JSON Web Token) merupakan sebuah token berbentuk JSON, yang dapat dikirim melalui URL, lebih tepatnya bagian header, jwt berfungsi untuk melakukan verifikasi menggunakan token yang di generate sendiri oleh jwt pada saat login.
  Struktur token jwt adalah diawali dengan header, payload, dan signature.

* **CORS**
  Cross-Origin Resource Sharing (CORS) adalah mekanisme yang menggunakan header HTTP tambahan untuk memberi tahu browser agar memberikan akses ke resource (API) yang diambil dari sumber yang berbeda.

* **Multer**
  Multer adalah sebuah middleware node.js untuk menangani multipart/form data yang mana tidak dapat ditangani oleh body parser, yang biasanya digunakan untuk mengunggah file.

* **Node JS**

  Node.js adalah perangkat lunak yang didesain untuk mengembangkan aplikasi berbasis web dan ditulis dalam sintaks bahasa pemrograman JavaScript. Bila selama ini kita mengenal JavaScript sebagai bahasa pemrograman yang berjalan di sisi client / browser saja, maka Node.js ada untuk melengkapi peran JavaScript sehingga bisa juga berlaku sebagai bahasa pemrograman yang berjalan di sisi server, seperti halnya PHP, Ruby, Perl, dan sebagainya.
* **Express JS**

  ExpressJS merupakan framework nodejs minimal yang sangat fleksibel. Anda bisa membuat web server HTML, server file statik, aplikasi chat, search engine, sosial media, layanan web dengan akses melalui REST API atau aplikasi hybrid yaitu selain pengguna mempunyai akses melalui REST API juga mempunyai akses ke HTML page.
* **MySql**

  MySQL merupakan database engine atau server database yang mendukung bahasa database pencarian SQL. MySQL adalah sebuah perangkat lunak sistem manajemen basis data SQL atau DBMS yang multithread, multi-user. 
* **Nodemon**

  Nodemon adalah utilitas yang akan memantau setiap perubahan di source code kalian dan secara otomatis memulai ulang server kalian. Instal menggunakan npm. Cukup gunakan nodemon alih-alih node untuk menjalankan kode Anda, dan sekarang server kalian akan otomatis dimulai ulang saat kode Anda berubah.

## How to Start
 > ```git clone https://github.com/mkhoirulwafa/zwallet-backend```
 
 > ```npm install```
 
 > import zwallet.sql into your favourite database (MySql Preferred)
 
 > start the server with ```nodemon server.js```
 
 > use your API tester software (Like Postman) and do Test with server http://localhost:8000/
 
 ## Documentation API

  https://documenter.getpostman.com/view/12936133/TVRpz4qF