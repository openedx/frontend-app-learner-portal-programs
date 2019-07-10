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

## How to run/serve a production build locally

```
npm run build   # Builds to dist folder
rm -rf public   # If you already have a public folder there
mv dist public  # Rename dist folder
npm run serve   # Run server. This command will automatically look at public/ directory
```

## Testing

Testing is supported with Jest and Enzyme. To run tests, use:

```$ npm test```

to use dummy branding data, add `useDummyData` to the `options` object of the `gatsby-source-wagtail` plugin

```
{
  resolve: 'gatsby-source-wagtail',
    options: {
      useDummyData: true,
    }
}
```

## Other useful commands

```$ npm clean```

This will remove the current gatsby cache and public folder. Can be useful if you run into plugin/dependency issues, or a graphql error that doesn't make sense.

```$ npm shell```

This can be used to get into the gatsby instance and see important information, such as the babel config, your static queries, the graphql schema, etc.