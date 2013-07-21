describe('AW2', function() {

	it('to be defined', function() {
		expect( aw2 ).toBeDefined();
	});


	describe('AW2.type', function() {

		it('String to be string', function() {
			expect( aw2.type('string') ).toBe('string');
		});

		it('Boolean to be boolean', function() {
			expect( aw2.type(true) ).toBe('boolean');
			expect( aw2.type(false) ).toBe('boolean');
		});

		it('Number to be number', function() {
			expect( aw2.type(-1) ).toBe('number');
			expect( aw2.type(0) ).toBe('number');
			expect( aw2.type(1) ).toBe('number');
			expect( aw2.type(0.1) ).toBe('number');
			expect( aw2.type(100000) ).toBe('number');
		});

		it('Function to be function', function() {
			var fn = function() { a = 1 };
			expect( aw2.type(fn) ).toBe('function');
		});

		it('Array to be array', function() {
			expect( aw2.type([1,2]) ).toBe('array');
		});

		it('Date to be date', function() {
			var d = new Date('2013');
			expect( aw2.type(d) ).toBe('date');
		});

		it('RegExp to be regexp', function() {
			var r = new RegExp(/{{a}}/g);
			expect( aw2.type(r) ).toBe('regexp');
		});

		it('Object to be object', function() {
			var obj = {};
			expect( aw2.type(obj) ).toBe('object');
		});

	});


	describe('AW2.isArray', function() {

		it('array to return true', function() {
			expect( aw2.isArray([1,2]) ).toBe(true);
		});

		it('non array to return false', function() {
			expect( aw2.isArray('not array') ).toBe(false);
		})

	});


	describe('AW2.arrayContains', function() {

		var a = [1,2,4];

		it('array [1,2,4] contains 4 at Position 2', function() {
			expect( aw2.arrayContains(a, 4) ).toBe(2);
		});

		it('array [1,2,4] contains 1 at Position 0', function() {
			expect( aw2.arrayContains(a, 1) ).toBe(0);
		});

		it('pass non array returns "Not Array"', function() {
			expect( aw2.arrayContains('test', 1) ).toBe('Not Array');
		});

		it('pass no element to find returns -1', function() {
			expect( aw2.arrayContains(a) ).toBe(-1);
		});

	});


	describe('AW2.arrayToList', function() {

		var a = ['Matthew','Jim','Sandy']
			, b = "Matthew,Jim,Sandy";

		it('array [' + a + '] to return in comma seperated list : ' + b, function() {
			expect( aw2.arrayToList(a) ).toBe(b);
		});

		it('array [' + a + '] to return in a pipe seperated list', function() {
			expect( aw2.arrayToList(a, '|') ).toBe('Matthew|Jim|Sandy');
		});

		it('Pass a non string value as separator, default to comma sperator ' + b , function() {
			expect( aw2.arrayToList(a, 1) ).toBe(b);
		});

	});


	describe('AW2.arrayFirst', function() {

		var a = ['Matthew','Jim','Sandy']
			, b = [1,2,3];

		it('array [' + a + '] to return Matthew', function() {
			expect( aw2.arrayFirst(a) ).toBe('Matthew');
		});

		it('An emtpy array returns undefined', function() {
			expect( aw2.arrayFirst([]) ).toBe(undefined);
		});

		it('An string returns false', function() {
			expect( aw2.arrayFirst('String') ).toBe(false);
		});

		it('array [' + b + '] to return 1', function() {
			expect( aw2.arrayFirst(b) ).toBe(1);
		});

	});


	describe('AW2.arrayLast', function() {

		var a = ['Matthew','Jim','Sandy']
			, b = [1,2,3];

		it('array [' + a + '] to return Sandy', function() {
			expect( aw2.arrayLast(a) ).toBe('Sandy');
		});

		it('An emtpy array returns undefined', function() {
			expect( aw2.arrayLast([]) ).toBe(undefined);
		});

		it('An string returns false', function() {
			expect( aw2.arrayLast('String') ).toBe(false);
		});

		it('array [' + b + '] to return 3', function() {
			expect( aw2.arrayLast(b) ).toBe(3);
		});

	});


	describe('AW2.structKeyExists', function() {

		var s = { name : "Matthew",
							age : 28,
							job : 'Web Developer',
							social : {
								twitter : "@faxtion"
							} }
			, es = {};

		it('struct : ' + JSON.stringify(s) + ' to have key: name', function() {
			expect( aw2.structKeyExists(s, 'name') ).toBe(true);
		});

		it('struct : ' + JSON.stringify(s) + ' to have key: age', function() {
			expect( aw2.structKeyExists(s, 'age') ).toBe(true);
		});

		it('struct : ' + JSON.stringify(s) + ' s.social to have key: twitter', function() {
			expect( aw2.structKeyExists(s.social, 'twitter') ).toBe(true);
		});

		it('Check for a key in an empty struct', function() {
			expect( aw2.structKeyExists(es, 'name') ).toBe(false);
		});

	});


	describe('AW2.structDelete', function() {

		var s = { name : "Matthew",
							age : 28,
							job : 'Web Developer',
							social : {
								twitter : "@faxtion"
							} }
			, es = {};

		it('struct : ' + JSON.stringify(s) + ' remove key: name', function() {
			var n = { age : 28,
							job : 'Web Developer',
							social : {
								twitter : "@faxtion"
							} };
			expect( aw2.structDelete(s, 'name') ).toBe();
			expect( aw2.structKeyExists(s, 'name') ).toBe(false);
		});

	});

});
