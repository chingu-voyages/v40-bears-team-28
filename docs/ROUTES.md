# App Endpoints

## Users Endpoints

__Note the route will look like__

Route Title: 'Route/:id' [HTTP Request] [TOKEN]

- [:id] : You need to send **User id** as param
- [TOKEN]: You need to send `Authorization: 'Bearer ${token}'` as Header
- [BODY]: What you need to send as body for the route

Users Routes

1. Get all users: '/api/users' [GET] [TOKEN]
    - None
2. Get user by id: '/api/users/:id' [GET] [TOKEN]
    - None
3. Create new user: '/api/users' [POST]
    - ```javascript
      username: 'user'
      email: 'email@email.com'
      image: 'image-path'
      password: '123456789'
      ```
4. Check if email exist or not: '/api/users/check' [POST]
    - `email: 'email@email.com'`
5. Authenticate user: '/api/users/auth' [POST]
    - ```javascript
      email: 'email@email.com'
      password: 123456789
      ```
6. Update username, email or image: '/api/users/:id'  [PUT] [TOKEN]
    - ```javascript
      username: 'new username'
      email: 'new email'
      image: 'new image path'
      ```
    - __Note: you can update one of them or all at the same time__
7. Updating user password: '/api/users' [PATCH] [TOKEN]
    - `password: 'new password'`
8. Updating forgot password: '/api/users/reset' [PATCH] [TOKEN]
    - `password: 'new password'`
9. Delete user: '/api/users' [DELETE] [TOKEN]
    - `email: 'email@email.com'`
10. Get user session credentials: '/api/users/auth/session'
    - None

## User Books Endpoints

1. Get user books: '/api/user/books/:id' [GET] [TOKEN]
    - None
2. Get saved sook for user '/api/user/books/:id/:book_id' [GET] [TOKEN]
    - None
3. Save book for user '/api/user/books/:id' [POST] [TOKEN]
    - ```javascript
      id: 'Book id'
      title: 'Book title'
      authors: 'Book authors'
      description: 'Book description'
      publisher: 'Book publisher'
      pages: 'Book pages number'
      year: 'Book published year'
      image: 'Book image path'
      url:'Book url to read'
      ```
4. Delete saved book for user '/api/user/books/:id/:book_id' [DELETE] [TOKEN]
   - None