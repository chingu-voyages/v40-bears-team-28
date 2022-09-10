
<a name="readme-top"></a>



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- logo link
   <a href="https://github.com/chingu-voyages/v40-bears-team-28">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
   </a>
   -->

  <h3 align="center">Books Hut</h3>

  <p align="center">
    An awesome website to read all your favorite books and save them!
    <br />
    <!-- <a href="https://github.com/chingu-voyages/v40-bears-team-28"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="https://github.com/chingu-voyages/v40-bears-team-28">View Demo</a>
    ·
    <a href="https://github.com/chingu-voyages/v40-bears-team-28/issues">Report Bug</a>
    ·
    <a href="https://github.com/chingu-voyages/v40-bears-team-28/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Having trouble finding time to read your favorite book? Books Hut is a free, big library with a wide range of books, from Philosophy to the Computer Science! All you have to do is create your account, add books to your personal library, and start reading! For every book you read you can earn points and you will also get access to exclusive content.

Reading a book from beginning to end is not always possible with work, family, and other commitments. Books Hut allows you to read books in between your busy schedule. Why rush through a good book? Read it at your own pace and store them in your library for future reference. With a wide-range of books, our library has everything you're looking for.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section lists all major technologies used to bootstrap our project.

* [![React][React.js]][React-url]
* [![Postgres][Postgres-shield]][Postgres-url]
* [![Redis][Redis-shield]][Redis-url]
* [![SASS][SASS-shield]][SASS-url]
* [![TypeScript][TypeScript-shield]][TypeScript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Prerequisites

This is an list of things you need to have to run application.
* <a href="https://redis.io/docs/getting-started/">Redis</a>
* <a href="https://www.postgresql.org/download/">PostgreSQL</a>
  

### Installation

_Below is an example of how you can install and setup our app._

1. Clone the repo
   ```sh
   git clone https://github.com/chingu-voyages/v40-bears-team-28.git
   ```
2. Install NPM packages in client and server folders
   ```sh
   npm install
   ```
3. Create PostgreSQL database with user and connect them through .env 
   ```js
    PORT=4000
    ENV=dev
    POSTGRES_HOST=127.0.0.1
    POSTGRES_PORT=5432
    POSTGRES_DB=books
    POSTGRES_TEST_DB=books_test
    POSTGRES_USERNAME=YOUR-DATABASE-USERNAME
    POSTGRES_PASSWORD=YOUR-DATABASE-PASSWORD
    BCRYPT_PASSWORD=YOUR-BCRYPT-PASSWORD
    SALT_ROUNDS=10
    AUTH_SECRET=YOUR-SECRET
    RESET_PASSWORD_SECRET=YOUR-SECRET
    COOKIE_SECRET=YOUR-SECRET
   ```
4. Start server
   ```sh
   cd Books/server
   npm run dev
   ```
5. Start client
   ```sh
   cd Books/client
   npm start
   ```
5. Go to http://localhost:3000/
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Dmitry Kulakov - [@AtomEistee](https://twitter.com/AtomEistee) - atomeistee@gmail.com


<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/chingu-voyages/v40-bears-team-28.svg?style=for-the-badge
[contributors-url]: https://github.com/chingu-voyages/v40-bears-team-28/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chingu-voyages/v40-bears-team-28.svg?style=for-the-badge
[forks-url]: https://github.com/chingu-voyages/v40-bears-team-28/network/members
[stars-shield]: https://img.shields.io/github/stars/chingu-voyages/v40-bears-team-28.svg?style=for-the-badge
[stars-url]: https://github.com/chingu-voyages/v40-bears-team-28/stargazers
[issues-shield]: https://img.shields.io/github/issues/chingu-voyages/v40-bears-team-28.svg?style=for-the-badge
[issues-url]: https://github.com/chingu-voyages/v40-bears-team-28/issues
[license-shield]: https://img.shields.io/github/license/chingu-voyages/v40-bears-team-28.svg?style=for-the-badge
[license-url]: https://github.com/chingu-voyages/v40-bears-team-28/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/product-screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Postgres-shield]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Redis-shield]: https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[SASS-shield]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[SASS-url]: https://sass-lang.com/
[TypeScript-shield]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/