chai = require 'chai'
expect = chai.expect
_ = require 'underscore'
Utility = require '../public/js/utility'

describe 'Utility', ->
	describe 'split', ->
		split = (s) -> new Utility(_).split s

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



	describe 'withoutId', ->
		withoutId = (array, id) -> new Utility(_).withoutId array, id

		it 'removes item with id 1', ->
			filtered = withoutId [{id: 1}], 1
			expect(filtered.length).to.be.equal 0

		it 'does not remove item with id 1 when not there', ->
			filtered = withoutId [{id: 0}], 1
			expect(filtered.length).to.be.equal 1
