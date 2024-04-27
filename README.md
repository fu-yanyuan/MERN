# MERN
web dev during onboarding


[YouTube Vite or CRA](Vite vs Create React App in 2024)

videos

https://www.youtube.com/watch?v=C5hQxdA_eY0&ab_channel=CodeBlessYou 

https://www.youtube.com/watch?v=LYEkguL9PcY&ab_channel=CodewithAniaKub%C3%B3w

Udemy, MERN stack - https://www.udemy.com/course/mern-stack-front-to-back/?couponCode=ST7MT41824 

learn react - https://react.dev/learn/start-a-new-react-project

Vite - https://vitejs.dev/guide/why.html 

https://www.mongodb.com/languages/mern-stack-tutorial


# Server 

## `npm` install
```
npm i express cors bcrypt jsonwebtoken uuid dotenv nodemon 
npm i pg
```

test
```
npm run start 
```
## postgresql configure
inside the psql database, run
```
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO <username>;
```

# Client 

`npm run dev`

## trouble shooting

### something wrong with packages
```
rm -rf node_modules package-lock.json
npm install
```