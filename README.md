# stackoverflow-challenge

## Run

```
$> cd database
$> docker-compose up -d
$> cd ../backend
$> npm install && adonis serve --dev &
$> cd ../frontend
$> yarn install && yarn start &
```

## Application

The application is not working yet. I've struggled with some basic concepts of Nodejs and ES < 6.
The main idea is to make a backend schedule that runs 30 times and then wait a few seconds. Also, the app would always check if the backoff field is set, if it is, the schedule should wait to run again.
For each request, the app would return 100 users and save them on my database. Those requests would use the "fromdate" param to bring only new users.
To save bandwidth I would create a filter to only bring what it is important for my application.
And of course, I should have written tests.

## Questions

### How did you approach the challenge?

At first, I tried to find a way to make the location filter using the stackoverflow API, it took me some time to finally understand that it was not possible, so I should create the users on my database and filter from there. The idea was to create a backend schedule to get all stackoverflow users, ordered by creation date (asc), and save them all no my database. That way, for each request I would use the "fromdate" param with the "creation_date" of the last create user, this would assure that I would only get users that I don't already have.

### What did you like about the challenge?

I'd never used NodeJs before, and even I not completing the challenge, it seems an easy and fast way to create web apps. 
What is really cool about this challenge is that it is about performance and availability, and not about features and usability.
The idea is make sure the user gets what he wants considering all API limitations.

### What did you find hard in the challenge?

I've really struggled with how to make simple things with Nodejs and Adonis. Also, it's really hard to keep trying to solve problems 5 hours straight, sure you can make pauses, but then you will lose precious time.

### How would you improve the challenge?

That depends. For your company, make things really fast is what makes you different from the other ones?! If so, I guess the challenge is ok (it might be the case, considering the average time to create an MVP). But if not, I think 5 hours is too short for a code challenge. Most people get nervous when participating in a recruitment process and that makes them lose time doing simple things.
