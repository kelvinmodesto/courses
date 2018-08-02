// feedreader.js
// This is the spec file that Jasmine will read and contains
// all of the tests that will be run against your application.


// We're placing all of our tests within the $() function,
// since some of these tests may require DOM elements. We want
// to ensure they don't run until the DOM is ready.
$(function() {
   
    // This is our first test suite - a test suite just contains
    // a related set of tests. This suite is all about the RSS
    // feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', function() {
        
        // This is our first test - it tests to make sure that the
        // allFeeds variable has been defined and that it is not
        // empty. Experiment with this before you get started on
        // the rest of this project. What happens when you change
        // allFeeds in app.js to be an empty array and refresh the
        // page?
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        // Iterate allFeeds object and ensures it has a URL defined
        // and that the URL is not empty.
        it('URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        // Iterate allFeeds object and ensures it has a name defined
        // and that the name is not empty.
        it('name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    // Test suite named "The menu"
    describe('The menu', function() {
        var btnMenuLink = $('.menu-icon-link');

        //Check if body element has menu-hidden class
        var isHidden = function() {
            return $('body').hasClass('menu-hidden');
        }

        // Check the menu element is hidden by default.
        it('hidden by default', function() {
            expect(isHidden()).toBe(true);
        });

        // Check the menu changes visibility when the menu icon is clicked.
        it('changes visibility', function() {
            btnMenuLink.trigger('click');
            expect(isHidden()).toBe(false);
            btnMenuLink.trigger('click');
            expect(isHidden()).toBe(true);
        });
    });

    // Test suite named "Initial Entries" 
    describe('Initial Entries', function() {
        var feed,hasEntry,index=1;

        // Calling loadFeed and check if it length is higher than 0
        beforeEach(function(done) {
            loadFeed(index, function() {
            feed = $('.feed .entry').length;
            hasEntry = feed>0;
            done();
            });

        });

        // Write a test that ensures when the loadFeed
        // function is called and completes its work, there is at least
        // a single .entry element within the .feed container.
        it('loadFeed function is called and completes its work', function(done) {
            expect(hasEntry).toBe(true);
        });

    });

    // Test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        var rssBefore,rssAfter,indexAfter=2;


        // Calling loadFeed with two differents index and compare it
        beforeEach( function(done) {
            rssBefore=$('.feed').html();
            loadFeed(indexAfter, function() {
                rssAfter = $('.feed').html();
                done();
            });
        });

        // Ensures when a new feed is loaded
        // by the loadFeed function that the content actually changes.
        it('new feed is loaded by the loadFeed function', function(done) {
            expect(rssAfter == rssBefore).not.toBe(true);
        });

    });

}());
