# Salary-match

## Project setup
To install required dependencies, just do:
```
npm install
```

## Run Project
To run project type following command.
```
npm run serve
```
Once server is ready, you should be able to see the webapp on http://localhost:8080 (if port is available)

## Run Tests
You can perform units and e2e tests.

To perform unit tests:
```
npm run test:unit
```

and to perform e2e tests:
```
npm run test:e2e
```

## Wiki

### How to use app
The webapp will allow you to enter 2 salaries. If candidate salary is less or equal than employer salary, a modal will appear with a success message. 

Otherwise, a failure message will be displayed.

Use case:
- Select a tab
- Enter a salary
- Click on Submit button (value will not be stored if button is not pressed)
- Switch tab
- Enter another salary
- Click on Sumbit
- Modal is displayed
- Close modal
- Repeat =)

Once you submit a value, you can switch between tabs without clearing it.

### Weather of London
To get weather I used the sample given in [documentation](https://openweathermap.org/current), but it looks like it always sends the same value (7deg).

You could miss it but the color of weather depends of weather (cold is blue, very hot is red). You can try to change the degree displayed in component to see color changing.

I also used their picto.

### How to test e2e
Once you executed the command you will be able to launch the main.js test from cypress. It will perform a full navigation of the app, and will try to push invalid data as well.

### How to test unit
Once you executed the command a report will be displayed. I just added tests to see if some functions are working correctly. It lacks of coverage.

## Improvement
- Add more unit tests
- Rework e2e tests which could be written in a smarter way
- Use constants in vuex to prevent "silly" mistakes
