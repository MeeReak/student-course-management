<a id="readme-top"></a>

<!-- PROJECT LOGO
<br />
<div align="center">
  <a href="https://github.com/vath-song99">
    <img src="![image](https://github.com/MeeReak/student-course-management/assets/138286828/768ae5c2-7f9d-4368-9797-b0988b5603aa)" alt="Logo" width="80" height="80">
  </a> 

  <h3 align="center">Smoeury Songvat</h3>

  <p align="center">
    School and Course Management projects!
    <br />
    <a href="https://www.postman.com/scm666-8604/workspace/scm-workspace/collection/30787235-76b903d7-4573-4c71-b72b-bee7e76297e7?action=share&creator=30787235&active-environment=30787235-f395e208-c66f-49bd-ba54-ea73b17ffa90"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.postman.com/scm666-8604/workspace/scm-workspace/collection/30787235-76b903d7-4573-4c71-b72b-bee7e76297e7?action=share&creator=30787235&active-environment=30787235-f395e208-c66f-49bd-ba54-ea73b17ffa90">View Demo</a>
    ·
    <a href="https://github.com/Vath-Song99/SCM_monolithic/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Vath-Song99/SCM_monolithic/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>-->



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
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

### About The Project

The Student course management system built with NodeJS and Express. It allows managing students and courses through CRUD operations (Create, Read, Update, Delete). Students and courses have detailed information stored, and you can search for them by name or phone number. Additionally, the system lets students register for courses and generates reports on both students and courses.


### Built With

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

- ### Deployed
  *To test the deployed API, click here.*[click-here](https://www.postman.com/science-astronaut-43204919/workspace/student-course-management/collection/33490622-8ceb8f79-c719-4e78-9a6a-eaff1a2505a4)


- ### Local
  #### Prerequisites

  *This is an example of how to list things you need to use the software and how to install them.*
* npm
  ```sh
  npm install npm@latest -g
  ```
    or

* yarn
  ```sh
  npm install yarn@latest -g
  ```
### Installation

_Below is an example of how to settup the project requirement


1. Clone the repo
   ```sh
   https://github.com/MeeReak/student-course-management.git
   ```
2. Install NPM or YARN packages
   ```sh
   npm install
   ```
   or

   ```sh
   yarn install
   ```   
3. Enter your .env variables in `configs/.env`
   ```js
    NODE_ENV=dev
    LOG_LEVEL=debug
    DB_URL=your_database_url
    PORT=3000
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

_Below is an example of how to get start the project!

1. Start Server
   ```sh
   npm run start:dev
   ```
    or
    ```sh
   yarn start:dev
     ```
2. Run Test
   ```sh
   npm run start:test
   ```
   or

   ```sh
   yarn start:test
   ```   
Below are some examples of how to use the API endpoints.

_For more examples, please refer to the [Documentation](https://www.postman.com/scm666-8604/workspace/scm-workspace/collection/30787235-76b903d7-4573-4c71-b72b-bee7e76297e7?action=share&creator=30787235&active-environment=30787235-f395e208-c66f-49bd-ba54-ea73b17ffa90)_

### Endpoint

### 1. Student CRUD Operations (using soft delete)

- **Create Student**: `POST /v1/students`
- **Retrieve a Student**: `GET /v1/students/{id}`
- **Update Student**: `POST /v1/students/{id}`
- **Delete Student**: `DELETE /v1/students/{id}`
- **List Students**: `GET /v1/students`

### 2. Student Search

- **Search Students by Full Name or Phone Number**: `GET /v1/students/search?en={en}&km={km}&phoneNumber={phoneNumber}`

### 3. Course CRUD Operations (using soft delete)

- **Create Course**: `POST /v1/courses`
- **Retrieve a Course**: `GET /v1/courses/{id}`
- **Update Course**: `PUT /v1/courses/{id}`
- **Delete Course**: `DELETE /v1/courses/{id}`
- **List Courses**: `GET /v1/courses` 

### 4. Course Search

- **Search Courses by Name**: `GET /v1/courses/search?name={name}`
- **Advanced Search Courses by Start Date and End Date**: `GET /v1/courses/date?startDate={startDate}&endDate={endDate}`

### 5. Register/Remove Course for Student

- **Register Course for Student**: `POST /v1/students/{id}/course/{courseId}`
- **Remove Course for Student**: `DELETE /v1/students/{id}/course/{courseId}`

### 6. Course Report

- **Course Report**: `GET /v1/courses/reports`

### 7. Student Report

- **Student Report**: `GET /v1/students/reports`


## Sample Request Body

- **Student**
```sh
    {
        "name":{
                "en": "Kaizen",
                "km": "សុខគា"
        },
        "dateOfBirth": "02-02-2022", # format "yy,mm,dd"
        "gender": "Male",
        "phoneNumber": "0123456789"
        "courses": [
                 "667fb8a1fd67fa8bce216370",
                 "667fb9e20d778b0eb1a8d0db"
        ], 
    }
```

- **Course**
```sh
    {
        "name": "Javascript",
        "professorName": "Kaizen",
        "startDate": "04-01-2024",
        "endDate": "12-01-2024",
        "limit": 15,
        "Enroll": [
                  "667f9b5d608df88473d6dc1a",
                  "667fbc0c2ee96d8d99d0b68e"
              ], 
          }
```
  
## Sample Response Body

- **Student**
```sh
    {
        "_id": "667fbc0c2ee96d8d99d0b68e",
        "name":{
                "en": "Kaizen",
                "km": "សុខគា"
        },
        "dateOfBirth": "02-02-2022", # format "yy,mm,dd"
        "gender": "Male",
        "phoneNumber": "0123456789"
        "courses": [
                 "667fb8a1fd67fa8bce216370",
                 "667fb9e20d778b0eb1a8d0db"
        ], 
        "is_deleted": false,
        "__v": 1
    }
```

- **Course**
```sh
    {
        "name": "Javascript",
        "professorName": "Kaizen",
        "startDate": "04-01-2024",
        "endDate": "12-01-2024",
        "limit": 15,
        "Enroll": [
            "667f9b5d608df88473d6dc1a",
            "667fbc0c2ee96d8d99d0b68e"
        ],
    }
```
### Validation

**Student Document Validation**:

1. `name`:{
       `en`: Must be a non-empty string.
       `km`: Must be a non-empty string.
   }
2. `dateOfBirth`: Must be a valid date.
3. `gender`: Must be either "male", "female", or “other” valid options.
4. `phoneNumber`: Must be a valid phone number format .
5. `Course` :  Must be an array of valid course IDs. The string of IDs should not exceed

**Course Document Validation**:

1. `name`: Must be a non-empty string.
2. `professorName`: Must be a non-empty string.
3. `limit`: Must be a positive integer.
4. `startDate`: Must be a valid date.
5. `endDate`: Must be a valid date and must be after `start_date`.
6. `Enroll`: Must be an array of valid student IDs. The string of IDs should not exceed .

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Rin Tithyareak - [@Mee Reak](https://www.facebook.com/mee.reak.9461) - meereak168@gmail.com

Project Link: [https://github.com/MeeReak/student-course-management.git](https://github.com/MeeReak/student-course-management.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/scm_monolithic?style=for-the-badge
[contributors-url]: https://github.com/vath-song99/scm_monolithic/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/vath-song99/scm_monolithic.svg?style=for-the-badge
[forks-url]: https://github.com/vath-song99/scm_monolithic/network/members
[stars-shield]: https://img.shields.io/github/stars/vath-song99/scm_monolithic.svg?style=for-the-badge
[stars-url]: https://github.com/vath-song99/scm_monolithic/stargazers
[issues-shield]: https://img.shields.io/github/issues/vath-song99/scm_monolithic.svg?style=for-the-badge
[issues-url]: https://github.com/vath-song99/scm_monolithic/issues
[license-shield]: https://img.shields.io/github/license/vath-song99/scm_monolithic.svg?style=for-the-badge
[license-url]: https://github.com/vath-song99/scm_monolithic/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/vath-song99
