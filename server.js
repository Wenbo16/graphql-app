var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');

var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLInt = graphql.GraphQLInt;

var graphQLServer = express();

var goldbergs = {
	1: {
		character: "Beverly Goldberg",
		actor: "Wendi McLendon-Covey",
		role: "matriarch",
		traits: "embarrasing, overprotective",
		id: 1
	},
	2: {
		character: "Murray Goldberg",
		actor: "Jeff Garlin",
		role: "patriarch",
		traits: "gruff, lazy",
		id: 2
	},
	3: {
		character: "Erica Goldberg",
		actor: "Hayley Orrantia",
		role: "oldest child",
		traits: "rebellious, nonchalant",
		id: 3
	},
	4: {
		character: "Barry Goldberg",
		actor: "Troy Gentile",
		role: "middle child",
		traits: "dim-witted, untalented",
		id: 4
	},
	5: {
		character: "Adam Goldberg",
		actor: "Sean Giambrone",
		role: "youngest child",
		traits: "geeky, pop-culture obsessed",
		id: 5
	},
	6: {
		character: "Albert 'Pops' Solomon",
		actor: "George Segal",
		role: "grandfather",
		traits: "goofy, laid back",
		id: 6
	}
}

// We are going to build a model which is pretty much a mirror image 
// of each Goldberg in our goldbergs data:
var goldbergType = new GraphQLObjectType({
	name: "Goldberg",
	description: "Member of The Goldbergs",
	fields: {
		character: {
		 	type: GraphQLString,
		 	description: "Name of the character",
		},
		actor: {
			type: GraphQLString,
			description: "Actor playing the character",
		},
		role: {
		 	type: GraphQLString,
		 	description: "Family role"
		},
		traits: {
		 	type: GraphQLString,
		 	description: "Traits this Goldberg is known for"
		},
		id: {
		 	type: GraphQLInt,
		 	description: "ID of this Goldberg"
		}
	}
});

function getGoldberg(id) {
	return goldbergs[id]
}

// The queryType specifies how we’ll query our data.
var queryType = new GraphQLObjectType({
    name: "my_first_query",
    description: "Goldberg query",
    fields: {
        getOneGoldberg: {
            type: goldbergType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: function(_, args) {
                return getGoldberg(args.id)
            }
        }
    }
});

// The shema brings it all together.
var schema = new GraphQLSchema({
	query: queryType
});


graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(8080);
console.log("The GraphQL Server is running.");

var compiler = webpack({
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/static/"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
});


// Next we create a new WebpackDevServer to serve our bundled project:
var app = new WebpackDevServer(compiler, {
	contentBase: "/static/",
	// adds our existing GraphQL server to our app server 
	// so that we can query it from within our app without any CORS issues.
	proxy: {"/graphql": `http://localhost:${8080}`},
	publicPath: "/static/",
	stats: {colors: true}
});


// Serve static resources
app.use('/', express.static('static'));
app.listen(3000);
console.log("The App Server is running.")