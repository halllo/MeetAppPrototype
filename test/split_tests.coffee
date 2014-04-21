chai = require 'chai'
expect = chai.expect
_ = require 'underscore'
Utility = require '../public/js/utility'

describe 'split', ->

	it 'splits "a"', ->
		splited = split "a"
		expect(splited).to.include('a')

	it 'splits "a,b"', ->
		splited = split "a,b"
		expect(splited).to.include('a').and.to.include('b')

	it 'splits "a, b"', ->
		splited = split "a, b"
		expect(splited).to.include('a').and.to.include('b')

	it 'splits "a, b and c"', ->
		splited = split "a, b and c"
		expect(splited).to.include('a').and.to.include('b').and.to.include('c')

	it 'splits "a, bandr and c"', ->
		splited = split "a, bandr and c"
		expect(splited).to.include('a').and.to.include('bandr').and.to.include('c')

split = (s) -> new Utility(_).split s