# frontend-app-learner-portal

## Overview
The learner portal allows a customized experience of learner-facing micro-frontend page components.

## How to set up the dev environment
 Clone this repo:

  ```$ git clone https://github.com/edx/frontend-app-learner-portal.git```

To run the project, first install dependencies

```$ npm i```

then, start the dev server:

```$ npm start```

## Where is it running?
The project itself will run on  ```http://localhost:8734```

you can test your graphql queries with the playground, found here:  ```http://localhost:8734/___graphql```

Netlify-cms admin portal is found at: ```http://localhost:8734/admin```


## Testing

Testing is supported with Jest and Enzyme. To run tests, use:

```$ npm test```

## Other useful commands

```$ npm clean```

This will remove the current gatsby cache and public folder. Can be useful if you run into plugin/dependency issues, or a graphql error that doesn't make sense.

```$ npm shell```

This can be used to get into the gatsby instance and see important information, such as the babel config, your static queries, the graphql schema, etc.