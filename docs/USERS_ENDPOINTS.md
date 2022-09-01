# Users Endpoints

__Note the route will look like__

Route Title: 'Route/:id' [HTTP Request]

- [Headers]
- [Params]
- [Body]

Users Routes

1. Get all users: '/api/users' [GET]
    - `Authorization: 'Bearer ${token}'`
    - None
    - None
2. Get user by id: '/api/users/:id' [GET]
    - `Authorization: 'Bearer ${token}'`
    - id
    - None
3. Create new user: '/api/users' [POST]
    - None
    - None
    - ```
      username: 'user',
      email: 'email@email.com',
      image: 'image-path',
      password: '123456789'
      ```
4. Check if email exist or not: '/api/users/check' [POST]
    - None
    - None
    - `email: 'email@email.com'`
5. Authenticate user: '/api/users/auth' [POST]
    - None
    - None
    - ```javascript
      email: 'email@email.com'
      password: 123456789
      ```
6. Update username, email or image: '/api/users/:id'  [PUT]
    - `Authorization: 'Bearer ${token}'`
    - id
    - ```javascript
      username: 'new username'
      email: 'new email'
      image: 'new image path'
      ```
    - __Note: you can update one of them or all at the same time__
7. Updating user password: '/api/users' [PATCH]
    - `Authorization: 'Bearer ${token}'`
    - None
    - `password: 'new password'`
8. Updating forgot password: '/api/users/reset' [PATCH]
    - `Authorization: 'Bearer ${token}'`
    - None
    - `password: 'new password'`
9. Delete user: '/api/users' [DELETE]
    - `Authorization: 'Bearer ${token}'`
    - None
    - `email: 'email@email.com'`
10. Get user session credentials: '/api/users/auth/session'
    - None
    - None
    - None