# url-shortner

Shortening: Take a url and return a much shorter url.
Redirection: Take a short url and redirect to the original url.
Custom url: Allow the users to pick custom shortened url.
Analytics: Usage statistics for site owner.
Ex: How many people clicked the shortened url in the last day?

## Check List

- [x] setup project
  - [x] git init
  - [x] install express
  - [x] setup simple route and run application
- [x] install dev dependencies
  - [x] nodemon
  - [x] add start script in package.json
- [x] Create database
  - [x] install mongoose and dotenv
  - [x] set db connection in config folder
  - [x] create schema for url shortner
- [x] create routes for shortner API
  - [x] install shortid
  - [x] create post request and save data in db
  - [x] create get request and redirect short url to full url
  - [x] track clicks
  - [x] error handeling
- [ ] Advance setup
  - [ ] add slug - custome code
  - [ ] set expiry to every short code created
  - [ ] add redis for caching
  - [x] rate limiting - throttle
  - [ ] custom 404 page
  - [ ] custom 500 page
  - [ ] favicon 
  - [ ] Site under maintanance page
- [ ] User panel
  - [ ] Register User with Social login
  - [ ] Signin/signout User 
  - [ ] View/Edit Profile 
  - [ ] view list of shortUrls created
  - [ ] View Analytics
- [x] frontend code
- [ ] API doc
- [x] security checks
- [ ] deployment
- [ ] test cases
- [ ] Code Coverage Metrics
- [ ] CICD
