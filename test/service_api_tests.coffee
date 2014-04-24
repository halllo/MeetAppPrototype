supertest = require 'supertest'
chai = require 'chai'
expect = chai.expect
mongoose = require 'mongoose'

describe 'Backend', ->
	
	arrayEqual = (a, b) -> 
		a.length is b.length and a.every (elem, i) -> elem is b[i]

	app = require '../app'
	get = (url) -> supertest(app).get(url)
	put = (url) -> supertest(app).put(url)
	del = (url) -> supertest(app).del(url)
	errorOrDone = (done, err) -> 
		throw err if err
		done()

	beforeEach (done) ->
		mongoose.connection.db.dropDatabase (err) -> done()


	describe 'Website', ->

		it 'returns index', (done) ->
			get '/' 
				.expect 200
				.end (err, res) -> errorOrDone(done, err)


	describe 'Service API', ->

		it 'gets activities', (done) ->
			get '/activities' 
				.expect 200, {activities: []}
				.end (err, res) -> errorOrDone(done, err)

		it 'puts incomplete activity with error', (done) ->
			put '/activities' 
				.expect 404, 'Activity not valid'
				.end (err, res) -> errorOrDone(done, err)

		it 'puts a new activity successfully', (done) ->
			put '/activities'
				.send { 
					"name": "name1",
					"location": "location1",
					"date": "2014.04.19",
					"user": "user1",
					"friends": ["user2", "user3"]
				} 
				.expect 200
				.expect (res) ->
					activity = res.body
					throw new Error if activity.name != "name1"
					throw new Error if activity.location != "location1"
					throw new Error if activity.date != "2014-04-18T22:00:00.000Z"
					throw new Error if activity.user != "user1"
					throw new Error if not arrayEqual activity.friends, ["user2", "user3"]
				.end (err, res) -> errorOrDone(done, err)
		
		it 'puts two new activities successfully', (done) ->
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
				.expect 200
				.expect (res) ->
					throw new Error if res.body.activities.length != 2
					activity1 = res.body.activities[0]
					throw new Error if activity1.name != "name1"
					throw new Error if activity1.location != "location1"
					throw new Error if activity1.date != "2014-04-18T22:00:00.000Z"
					throw new Error if activity1.user != "user1"
					throw new Error if not arrayEqual activity1.friends, ["user2", "user3"]
					activity2 = res.body.activities[1]
					throw new Error if activity2.name != "name2"
					throw new Error if activity2.location != "location2"
					throw new Error if activity2.date != "2014-04-18T22:00:00.000Z"
					throw new Error if activity2.user != "user2"
					throw new Error if not arrayEqual activity2.friends, ["user4", "user5"]
				.end (err, res) -> errorOrDone(done, err)
		
		it 'gets activities of user', (done) ->
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
			get '/users/user1/activities'
				.expect 200
				.expect (res) ->
					throw new Error if res.body.activities.length != 1
					activity = res.body.activities[0]
					throw new Error if activity.name != "name1"
					throw new Error if activity.location != "location1"
					throw new Error if activity.date != "2014-04-18T22:00:00.000Z"
					throw new Error if activity.user != "user1"
					throw new Error if not arrayEqual activity.friends, ["user2", "user3"]
				.end (err, res) -> errorOrDone(done, err)
		
		it 'deletes non-existing activity with error', (done) ->
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
			del '/activities/not_existing_id'
				.expect 404, 'Activity ID not valid'
				.end (err, res) -> errorOrDone(done, err)

		it 'deletes existing activity successfully', (done) ->
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
			idToDelete = ''
			get '/activities'
				.expect 200
				.expect (res) ->
					idToDelete = res.body.activities[0].id
				.end (err, res) -> errorOrDone(done, err)
			console.log "here: " + idToDelete #how do i get the variable set here?
			del '/activities/' + idToDelete
				.expect 200
				.expect (res) ->
					console.log res.body
				.end (err, res) -> 
			get '/activities'
				.expect 200
				.expect (res) ->
					throw new Error if res.body.activities.length != 0
				.end (err, res) -> errorOrDone(done, err)
