var restaurants,
    neighborhoods,
    cuisines;
var newMap;
var markers = [];
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2VsdmlubW9kZXN0byIsImEiOiJjamw0ZXNnZXcwaXkzM3Bwa3c4a2YwMzB0In0.x6ZHgnZ8lpmevBO52ibvjQ';

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    initMap(); // added
    fetchNeighborhoods();
    fetchCuisines();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
    DBHelper.fetchNeighborhoods((error, neighborhoods) => {
        if (error) { // Got an error
            console.error(error);
        } else {
            self.neighborhoods = neighborhoods;
            fillNeighborhoodsHTML();
        }
    });
};

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
    const select = document.getElementById('neighborhoods-select');
    neighborhoods.forEach(neighborhood => {
        const option = document.createElement('option');
        option.innerHTML = neighborhood;
        option.value = neighborhood;
        option.setAttribute("role", "option");
        select.append(option);
    });
};

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
    DBHelper.fetchCuisines((error, cuisines) => {
        if (error) { // Got an error!
            console.error(error);
        } else {
            self.cuisines = cuisines;
            fillCuisinesHTML();
        }
    });
};

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
    const select = document.getElementById('cuisines-select');

    cuisines.forEach(cuisine => {
        const option = document.createElement('option');
        option.innerHTML = cuisine;
        option.value = cuisine;
        option.setAttribute('role','option');
        select.append(option);
    });
};

/**
 * Initialize leaflet map, called from HTML.
 */
initMap = () => {
    self.newMap = L.map('map', {
        center: [40.722216,-73.987501],
        zoom: 12,
        scrollWheelZoom: false,
        tabindex:-1
    });
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
        mapboxToken: MAPBOX_TOKEN,
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/" tabindex="-1">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/" tabindex="-1">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/" tabindex="-1">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(newMap);
    updateRestaurants();
};

/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
    const cSelect = document.getElementById('cuisines-select');
    const nSelect = document.getElementById('neighborhoods-select');

    const cIndex = cSelect.selectedIndex;
    const nIndex = nSelect.selectedIndex;

    for (let item of cSelect) {
        item.selected ?
            cSelect[cIndex].setAttribute("aria-selected", true) : cSelect[item.index].setAttribute("aria-selected", false);
    }

    for (let item of nSelect) {
        item.selected ?
            nSelect[nIndex].setAttribute("aria-selected", true) : nSelect[item.index].setAttribute("aria-selected", false);
    }

    const cuisine = cSelect[cIndex].value;
    const neighborhood = nSelect[nIndex].value;

    DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
        if (error) { // Got an error!
            console.error(error);
        } else {
            resetRestaurants(restaurants);
            fillRestaurantsHTML();
        }
    })
};

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
    // Remove all restaurants
    self.restaurants = [];
    const ul = document.getElementById('restaurants-list');
    ul.innerHTML = '';

    // Remove all map markers
    if (self.markers) {
        self.markers.forEach(marker => marker.remove());
    }
    self.markers = [];
    self.restaurants = restaurants;
};

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
    const ul = document.getElementById('restaurants-list');
    const div = document.createElement('div');

    div.className = 'container';
    ul.setAttribute('role','list');

    restaurants.forEach(restaurant => {
        div.append(createRestaurantHTML(restaurant));
    });
    ul.append(div);
    addMarkersToMap();
};

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {

    const li = document.createElement('li');
    li.className = 'item';
    li.setAttribute('role','listitem');

    const name = document.createElement('h1');
    name.className = 'restaurant-title';
    name.innerHTML = restaurant.name;
    name.setAttribute('tabindex',1);
    li.append(name);

    const link = document.createElement('a');
    link.href = DBHelper.urlForRestaurant(restaurant);
    link.setAttribute("aria-label", restaurant.name);

    const alt = document.createAttribute('alt');
    alt.value = restaurant.name;

    const image = document.createElement('img');
    image.className = 'restaurant-img';
    image.setAttribute('role','presentation');
    image.setAttribute('aria-expanded',false);
    image.setAttribute('tabindex',1);
    image.setAttributeNode(alt);
    image.src = DBHelper.imageUrlForRestaurant(restaurant);

    link.append(image);
    li.append(link);

    const div = document.createElement('div');
    div.classList = 'restaurant-text card-content';

    const neighborhood = document.createElement('p');
    neighborhood.className = 'restaurant-paragraph';
    neighborhood.setAttribute('tabindex',1);
    neighborhood.innerHTML = restaurant.neighborhood;
    div.append(neighborhood);

    const address = document.createElement('p');
    address.className = 'restaurant-paragraph';
    address.setAttribute('tabindex',1);
    address.innerHTML = restaurant.address;
    div.append(address);

    li.append(div);

    const more = document.createElement('a');
    more.innerHTML = 'View Details';
    more.classList = 'restaurant-details card-content';
    more.setAttribute('aria-label', 'View Details');
    more.setAttribute('tabindex',1);
    more.href = DBHelper.urlForRestaurant(restaurant);

    li.append(more);

    return li;
};

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
    restaurants.forEach(restaurant => {
        // Add marker to the map
        const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.newMap);
        marker.on("click", onClick);

        function onClick() {
            window.location.href = marker.options.url;
        }

        self.markers.push(marker);
    });
};
