
# [ReviewAR-be](https://reviewar-be.onrender.com/api/)

This is a **RESTful API** built using Test-Driven-Development (TDD) that is used as the backend for [ReviewAR](https://github.com/KelvinUng1/ReviewAR-fe); an app that uses your current location data to show reviews of nearby attractions (restaurants, shops etc.) in an AR view.


**Hosted Version**: https://reviewar-be.onrender.com/api/

## Tech Stack
**Main**: JavaScript, Node.js, Express.js, PostgreSQL, ElephantSQL, Render

**Dev Dependencies**: Supertest, Jest, Jest-Sorted, and Pg-Format

## Endpoints

| GET /api                  | Description                                    |
|---------------------------|------------------------------------------------|
| /venues                   | Returns array of all venues                    |
| /venues/:venue_id         | Returns venue object by specified venue_id     |
| /venues/:venue_id/reviews | Returns an array of reviews by specified venue |
| /reviews/:review_id       | Returns review object by specified review_id   |
| /users                    | Returns array of all users                     |
| /users/:user_id           | Returns user object by specified user_id       |


| /api | Description                             |
|-----------|-----------------------------------------|
| **POST** /reviews  | create a review and returns posted review |
| **DELETE** /reviews/:review_id | removes review at specific review_id |        
| **PATCH** /reviews/:review_id | edits review at specific review_id |