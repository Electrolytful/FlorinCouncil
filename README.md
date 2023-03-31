# Florin County Web Application

## Contents

### Client
| Page | Description|
|------|------------|
| Homepage | All general information about the referred web application is shown. |
| Register | New user can be created. |
| Log in | An existing user can log in into the system. |
| Dashboard | Logged in user can have easy access to all services provided on the web app. |
| Library | Authenticated user can see all books currently avaiable for loan on the local library. | 
| My Books | User can see a history of all books they have borrowed on the past, as well as books they currently have. |
| Recycling Center | Logged in user can see all items currently available for donation from the recycling center. |
| Landmarks | Any user can see a list and description of local landmarks. |


### Server
| Route | Method | Response |
|-------|--------|----------|
| "/" | GET | Redirects user to the web application's main page. |
| "/users/register" | GET | Checks if user is authenticated and redirects to proper page. |
| "/users/login" | GET | Checks if user's session is valid and redirects them to proper page. |
| "/users/dashboard" | GET | Gets an authenticated user's username. |
| "/users/register" | POST | Checks new user's information meets requirements and creates new user. |
| "/users/login" | POST | Validates user against database and redirects them to correct page or displays warning message. |
| "/users/logout" | GET | Clears session and logs user out. |
| "/library" | GET | Gets all book currently avaialble from the database. |
| "/library/:book_name" | GET | Retrieves information about one specific book by name. |
| "/library/mybooks" | GET | Displays all book loans for specific user. |
| "/library/:book_id/loan" | POST | Creates a new book loan. |
| "/library/:book_id/return" | POST | Updates book loan status. |
| "/visit" | GET | Gets all information about local landmarks. |
| "/recycling/donations" | GET | Fetches information about all items currently available for donation from the local recycling center. | 
| "/recycling/donations/:id" | POST | Changes an donation item's status to donated. | 


## Requirements
- Web Browser - [read more](https://www.google.com/chrome/)
- Integrated Development Environment (IDE) - [read more](https://visualstudio.microsoft.com)
- Node.js - [read more](https://nodejs.org/en)
- Npm.js - [read more](https://www.npmjs.com)
- PostgreSQL instance - [read more](https://www.elephantsql.com)


## Rationale
This solution was created to aid the Florin County Council's population to address issues regarding their public services availability. The web application encompasses some community services such as access to public library services, donation of second hand items left on the local recycling center and a disclose all tourist attractions with easy access.


## Installation and Usage

In order to have access to this application, download this [repository](https://github.com/Electrolytful/FlorinCouncil) and open its content folder on an IDE.  
To install all necessary dependencies, open the terminal and nagivate to FlorinCouncil-main folder and run `npm install`.  
To set the database up, run `npm run setup-db` on the terminal.  
On the root folder (e.g. FlorinCouncil-main), create a `.env` folder and enter the following information:
- [x] DB_URL=<your_postgresql_instance_url>. 
- [x] PORT=<port_number>  
- [x] NODE_ENV=production  
- [x] SECRET=<any_secret_word>  
<br>
Next, run the server by entering `npm run dev` on the terminal.  
The web application will be running on the user's localhost (e.g. http://localhost:<port_number>).  

### Client

#### Homepage
On the main page the user will see all a welcome message and:  
1 - Will have the option to register;  
2 - Can log in if they already have an account.  
<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/homepage.png?raw=true" width=75% height=75%>
</p>
<br>
By scrolling down, the user will see a list of services provided by Florin Council, including a list of landmarks (arrowed, top). The user can always easily go back to the top of the page by clicking 'Back to Top' (arrowed, bottom).  
<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/homepage-2.png?raw=true" width=75% height=75%>
</p>

#### Visit
By clicking on 'see more', a list of local landmarks is open to the general public (no authentication needed to access this page), as seen below. The user can easily get back to the home back by clicking on the logo (arrowed, top).  
<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/visit.png?raw=true" width=75% height=75%>
</p>

#### Register
When clicking on the 'Register' button, the user will be redirected to the registration page. In order to be successfully registered, the user must provide:
1 - a unique username;
2 - a unique email address;
3 - their home address;
4 - a valid phone number;
5 - data of birth (user must be 16 or older);
6 - password;
7 - password confirmation.  
<br>
If any of this requirements is not met, the user will be prompted with a relevant message.  
Finally, in order to create a new user, they must press 'Register' (arrowed).  
<br>
If the user realizes they already have an account, they can easily go to the login page by clicking on the bottom link (arrowed, bottom).  
At any time the user can go back to the homepage by clicking on 'Home' (arrowed, top).  

<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/register.png?raw=true" width=75% height=75%>
</p>

#### Login
To log in, the user must provided the same email they used during registration and their password. Next, click 'Login' (arrowed) to sign in.  
If the user realizes they do not have an account, they can easily to go the registration page by clicking on the bottom link (arrowed, bottom).
<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/login.png?raw=true" width=75% height=75%>
</p>

#### Dashboard
Once logged in, the user will be prompted with a greeting message that will display their name (underlined). They also will have access to their dashboard, where they can see all the services supported by the application:  
1 - Library;  
2 - Recycling Center;  
3 - Local Attractions;  

<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/dashboard.png?raw=true" width=75% height=75%>
</p>
More details about these services below.  

#### Library
By clicking on the library icon, the user will be redirected to the library page. There they will be prompted with all books currently available.  
1 - To borrow a book, the user can simply click on the 'Borrow' button.  
To see all books they have borrowed, the user can go to the 'My books' section (arrowed).
<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/library.png?raw=true" width=75% height=75%></p>
<br>
On my books section, the user can see on the top all books currently borrowed by them.  
1 - To return a book, they can simply press the 'Return' button.  
At any time, the user can go back to the library's main page by clicking on 'Back to Library' (arrowed).
<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/library-2.png?raw=true" width=75% height=75%></p>
<br>
Scrolling down, the user can see a history of all book they have borrowed in the past and returned to the library.
<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/library-3.png?raw=true" width=75% height=75%>
</p>

#### Recycling Center - Community Donations
On the Recycling Center page, the user can see all second hand items that are set for donation. To accept a donation, the user simply has to click on the 'Accept Donation' button (arrowed), and the item will be automatically reserved for them.
<p align="center">
<img src="https://github.com/Electrolytful/FlorinCouncil/blob/julia/public/img/recycling-page.png?raw=true" width=75% height=75%>
</p>

### Server
The Florin Council API's server is hosted on the same server as the webpage, being conveniently linked to the client. The API is separated on 5 main routes:

#### '/'
Method: GET
Web application's main page.

#### '/users'
- Method: GET
  * /register -> checks if current session is authenticated and, if true, user is allowed to access dashboard. Otherwise, the user is redirected to the registration page.
  * /login -> checks if current session is authenticated and, if true, user is allowed to access dashboard. Otherwise, the user is redirected to the login page.
  * /dashboard -> checks session details to retrieve user's username.
  * /logout -> clears all session details on user's browser and redirects user to the login page.
- Method: POST
  * /register -> gets data provided by the user and checks against the API's contract requirements. If the check is successful, a new user is registered on the database.
  * /login -> gets user's data and checks against database to find an user by email. If the user is found, then proceed to check if the password provided is correct. If validations pass, the user is redirected to dashboard. Otherwise, returns an array of errors.

#### '/library'
- Method: GET
  * / -> sends a response with an array of Book objects containing all details about all books currently available on the database.
  * /:book_name -> sends a Book object containing all deitails of the title being passed as a parameter.
  * /mybooks -> sends a response with an array of Loan objects containing all deitails of all loans made by given user id.
- Method: POST
  * /:book_id/loan - > creates a new Loan object and updates the database to insert new data.
  * /:book_id/return -> updates a specific entry on the loans table on the database by setting complete value to true.

#### '/visit'
- Method: GET
  * / -> sends a response with an array of Location objects containing all deitails for local attractions currently on the database.

#### '/recycling'
- Method: GET
  * /donations -> sends a response with an array of Donation objects contaning all details for items currently available for donation at the Recycling Center.
  * /donations/:id -> updates a specific entry on the recycling_items table on the database by setting donated value to true.
