Feature: content

Scenario: search for cheap hotel with ascending price filter

Given i am at the "content" page
And the following hotels exist:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
    | Mountain View Lodge   | 250   | 200   |
    | City Center Apartment | 50    | 180   |
When i sort hotels by "ascending price" filter
Then i should see the hotels in this order:
    | City Center Apartment |
    | Mountain View Lodge   |
    | Beach Resort          |

Scenario: Hotel search by likes

Given i am at the "content" page
And the following hotels exist:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
    | Mountain View Lodge   | 250   | 200   |
    | City Center Apartment | 50    | 180   |
When i sort hotels by "most liked" filter
Then i should see the hotels in this order:
    | Mountain View Lodge   |
    | Beach Resort          |
    | City Center Apartment |

Scenario: Like a hotel

Given i am at the "content" page
And the following hotels exist:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
When i liked "Beach Resort"
Then i should see "151" likes in "Beach Resort"

Scenario: Save a hotel

Given i am at the "content" page
And i logged as "Bruno"
And the following hotels exist:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
    | Mountain View Lodge   | 250   | 200   |
    | City Center Apartment | 50    | 180   |
When i saved "Beach Resort"
And i sort hotels by "saved" filter
Then i should see those hotels
    | Beach Resort          | 150   | 300   |

Scenario: Three saved hotels

Given i am at the "content" page
And i logged as "Bruno"
And the following hotels are saved:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
    | Mountain View Lodge   | 250   | 200   |
    | City Center Apartment | 50    | 180   |
When i sort hotels by "saved" filter
Then i should see those hotels
    | Beach Resort          | 150   | 300   |
    | City Center Apartment | 50    | 180   |
    | Mountain View Lodge   | 250   | 200   |

Scenario: Save hotels without being logged

Given i am at the "content" page
And the following hotels exist:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
    | Mountain View Lodge   | 250   | 200   |
    | City Center Apartment | 50    | 180   |
When i saved "Beach Resort"
Then i should see a error "you must be logged to save hotels"

Scenario: make a review

Given i am at the "content" page
And i logged as "Bruno"
And the following hotels exist without review:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
And i made a reservation at the hotel "Beach Resort"
When i write a review for the hotel "Beach Resort" writing "A good resort, good location and good service."
Then i see the review "A good resort, good location and good service." in "Beach Resort"

Scenario: make a review without being logged

Given i am at the "content" page
And the following hotels exist without review:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
And i made a reservation at the hotel "Beach Resort"
When i write a review for the hotel "Beach Resort" writing "A good resort, good location and good service."
Then i should see a error "you must be logged to write reviews"

Scenario: make a review without made a reservation

Given i am at the "content" page
And i logged as "Bruno"
And the following hotels exist without review:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
When i write a review for the hotel "Beach Resort" writing "A good resort, good location and good service."
Then i should see a error "you must have made a reservation at this hotel to write reviews"

Scenario: share reservations

Given i am at the "content" page
And i logged as "Bruno"
And "Alvaro" exist
And the following hotels exist without review:
    | name                  | likes | price |
    | Beach Resort          | 150   | 300   |
And i made a reservation of "Beach Resort"
When i share the reservation with "Alvaro"
Then "Alvaro" must receive the status of having made the reservation of "Beach Resort"

