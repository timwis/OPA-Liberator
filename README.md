OPA Liberator
===============

The OPA Data Liberator was created at [Philly Tech Week's](http://phillytechweek.com) **Hackathon** on April 30, 2011.

This application aims to fill a gap in the City of Philadelphia's Office of Property Assessment (OPA) web site: the ability to search by owner. Currently, the OPA web site allows you to search by address and view the owner information, tax balances, etc. as it is all public record, but it does not allow you to search by owner.

How It Works
---------------

We were given a list of properties which we imported into a MySQL database. From there, we created a Ruby script that scrapes the data from the [OPA Property Search](http://opa.phila.gov/opa.apps/Search/SearchForm.aspx?url=search) site, and puts it into the MySQL database.

We then created a public front-end (what you're viewing now) with an owner search box. The data you input is sent to the back-end PHP script, which queries the database for all owners that match the specified string. When you select the owner, it sends another query to get all the properties listed with that string as the owner, and geocodes their location if it hasn't already been cached.. The front-end then puts those properties into the select box and plots them on the map with a link to their OPA info page.

Open Data
---------------

While this application does not currently utilize any open data, its creation (and subsequent naming) was intended to 'liberate' this data from the OPA web site. The team is engaging in talks with the OPA in hopes that they release the data in a compiled, downloadable format, in line with other data sets on [OpenDataPhilly](http://opendataphilly.org). So far the OPA has been quite receptive. It's up to their IT department now. We'll keep you posted.

The source code is available on [github](https://github.com/timwis/OPA-Liberator)

Credits
---------------
* [Adam Hinz](mailto:hinz.adam@gmail.com) - Ruby Scraper Script, Front-End HTML/CSS, Front-End Javascript/JQuery
* [Joanne Cheng](mailto:chengjoanne2@gmail.com) - Front End HTML/CSS, Front-End Javascript, Google Maps API
* [Tim Wisniewski](mailto:tim@timwis.com) - Back-End PHP, Minor Front-End Work
* [Mjumbe Wawatu Poe](mailto:mjumbewu@kwawatu.com) - Overall Assistance & Inspiration<
* [Gil](mailto:g@raphaelli.com) - Back-end Geocoder
* [Technically Philly](http://www.technicallyphilly.com) - Putting together Philly Tech Week & The Hackathon

Want to Help?
---------------
Are you a programmer or designer interested in open data and civic engagement? Email [Tim Wisniewski](mailto:tim@timwis.com) to be notified of future projects like this.

