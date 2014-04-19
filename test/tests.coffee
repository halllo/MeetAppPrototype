supertest = require 'supertest'
chai = require 'chai'
expect = chai.expect
mongoose = require 'mongoose'

describe 'app', ->
	
	app = require '../app'
	get = (url) -> supertest(app).get(url)
	put = (url) -> supertest(app).put(url)
	errorOrDone = (done, err) -> 
		throw err if err
		done()

	beforeEach (done) ->
		mongoose.connection.db.dropDatabase (err) -> done()


	it 'returns index', (done) ->
		get '/' 
			.expect 200, 'MeetApp prototype'
			.end (err, res) -> errorOrDone(done, err)

	it 'gets activities', (done) ->
		get '/activities' 
			.expect 200, {activities: []}
			.end (err, res) -> errorOrDone(done, err)

	it 'puts incomplete activity', (done) ->
		put '/activities' 
			.expect 404, 'Activity not valid'
			.end (err, res) -> errorOrDone(done, err)

	it 'puts a new activity', (done) ->
		put '/activities'
			.send { 
				"name": "name1",
				"location": "location1",
				"date": "2014.04.19",
				"user": "user1",
				"friends": ["user2", "user3"]
			} 
			.expect 200, {
				name: "name1",
				location: "location1",
				date: "2014-04-18T22:00:00.000Z",
				user: "user1",
				friends: ["user2", "user3"]
			}
			.end (err, res) -> errorOrDone(done, err)
	
	it 'puts two new activities', (done) ->
		put '/activities'
			.send { 
				"name": "name1",
				"location": "location1",
				"date": "2014.04.19",
				"user": "user1",
				"friends": ["user2", "user3"]
			} 
			.expect 200
			.end (err, res) -> 
		put '/activities'
			.send { 
				"name": "name2",
				"location": "location2",
				"date": "2014.04.19",
				"user": "user2",
				"friends": ["user4", "user5"]
			} 
			.expect 200
			.end (err, res) -> 
		get '/activities' 
			.expect 200, {activities: [
				{
					name: "name1",
					location: "location1",
					date: "2014-04-18T22:00:00.000Z",
					user: "user1",
					friends: ["user2", "user3"]
				},
				{
					name: "name2",
					location: "location2",
					date: "2014-04-18T22:00:00.000Z",
					user: "user2",
					friends: ["user4", "user5"]
				}
			]}
			.end (err, res) -> errorOrDone(done, err)
			