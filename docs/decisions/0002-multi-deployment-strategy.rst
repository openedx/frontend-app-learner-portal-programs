2. Multi deployment strategy
============================

Status
------

Draft

Context
-------

We would like to be able to theme and add custom pages to the learner portal
at build time so that we may build and deploy multiple versions of this app
for different customers.

Decision
--------

We will store the configuration (theming and pages) that will be baked into
this app in a separate service. At build time, we will call this services API,
collect the configuration, and dynamically build the pages and set the theme.

At this time we will store the configuration in the portal-designer application
(https://github.com/edx/portal-designer). Since we are using a plugin to
collect the data and it stores that data into an abstracted layer (GraphQL),
we will be able to swap out this source (or add to it) in the future if we
want.

This application will accept a environment variable called SITENAME which will
is the key by which all configuration data will be stored. Calling the app
with a SITENAME will tell the build server to gather the configuration for that
key and then build using that configuration.

In keeping with our web development norms, the built application will be
exported to `dist` (instead of the Gatsby-specific `public` so that it may be
deployed list the rest of our apps.

This app will not be responsible for building multiple versions of itself. When
`npm run build` is ran, only a single deployment from a single configuration
will be built.

Consequences
------------

Since the responsibility for building multiple deployments of this app will not
be handled by itself, that responsibility is now pushed to the deployment
pipeline.
