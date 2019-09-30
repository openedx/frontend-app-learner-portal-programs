3. Learner-portal graphql schema
--------------------------------

Status
------
Draft 

Context
-------
When data coming in from the designer api changes, we don’t want to leave it up to Gatsby to infer the fields and create nodes based on incomplete information. If designer doesn't include data for all fields required by a query on learner-portal, gatsby won't know those fields exist, and the query will error causing the build to fail. Instead, we would like to name all types for graphql, as to be explicit about the structure that queries can have. This will also standardize the schema from build to build, as opposed to leaving it up to gatsby.

Decision
--------
For each new type of query made, a coinciding `.gql` schema must be created with all the possible fields being made available in that query. All types must be named, and either made required or not. If a field is not required, that field should be `null`-able, as to not create situations where missing data will cause pages created by Gatsby to fail building.

These `.gql`  files should live in the `schema` folder found within the `@edx/gatsby-source-portal-designer` plugin package. A new file should be created each time a new query is needed. If new fields are needed in a query already created, they should be added to the file for the query.

Consequences
------------
This will safeguard us from pages failing to build due to missing information, but will not necessarily warn us if the data is not there.

Monitoring of these schemas is necessary to make sure they are in sync with the data coming from designer — This will be the “source of truth” for the data coming into the learner-portal, not designer. Any time data changes shape in designer, it must also be changed in the schema.

Resources
---------
* Querying Data with GraphQL: https://www.gatsbyjs.org/docs/querying-with-graphql/
* Customizing the graphql schema: https://www.gatsbyjs.org/docs/schema-customization/

