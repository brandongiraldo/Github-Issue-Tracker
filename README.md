# Vine Issue Tracker

This project was created as part of my coding audition for Vine. Created Using Angular.js and Bootstrap, this application serves as an Issue tracker for GitHub. It will hit GitHub's REST API and show/browse through the information.

The main URL is [https://api.github.com/repos/npm/npm/issues](https://api.github.com/repos/npm/npm/issues)

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview. This application runs on port 9000 and requires the connect-modrewrite library. With npm install `connect-modrewrite --save-dev` Run grunt for building and grunt server to run locally on port 9000.

If you wish to configure the port, Gruntfile.js contains server information.

## Testing

Running `grunt test` will run the unit tests with karma.

## Design Choices

When I was reading the description of this project, I had a vision for what it would look like. I had worked with REST APIs before, and understood how Angular could help in a big way.

I went with 9 cells layout, the number can be changed in the main.js controller. I went with 9 because it seemed like a good fit, and created a perfect large square made of 9 smaller squares.

In terms of UX, I went for a simple approach to mimic those like Twitter, Vine and Instagram. Subtle gray borders and background make the while tiles pop out. Simple color scheme, critical information properly displayed and the design interactions between the user and elements were thought out carefully to deliver the best possible User Experience.

## Technical Choices

This was the perfect assignment for Angular. Hitting the REST API and parsing it in JavaScript just go hand in hand. I asked if JS would be disabled, I was told it would not be. Should it have been, I would have gone with a Node.js approach, not needed today.

I used Yo Angular Generator to get up and running fast, I started with routes and the controllers. My vision of this application only had two views, hence I built routes for both and views.

I leveraged the Grid System in Bootstrap and Angular's ngRoute, made good use of the Pagination and HTML Binding functionality from the Internet (See Credits).

I also worked a lot in Angular to create my own custom modules and functions that greatly increase the feature set of this application.

## Design Drawbacks

The current design will not do the best with 1000 entries, mid development I realized that I should have thought of a compressed view for all the tiles. This would have helped fit many more issues on the single home page.

## Technical Drawbacks

Yo Angular Generator was a mess. I like to try new things, so I found this tutorial to get up and running. Usually I just build my own server.js file and add express, but this seemed even faster. 

This lead to a huge drawback as it took me hours to figure out how to enable HTML5 mode with Grunt. If I made my own server.js, I would have had it in 2 mins.

The biggest mess by far was Grunt refusing to install other angular libraries like sanitize. I also worked on this for hours, reading many articles, but eventually I fell into this error loop where i changed one thing and another broke. I changed that back and the original error returned. I had spent so much time investigating the error, but I just chose to implement the modules and directives within my controllers to get the same functionality I was seeking.

## Engineering Problems

Perhaps the most interesting problem in this challenge was creating the HTML tag to name in JSON (@name).

I solved it by generating HTML over the name, and then using the HTML literal in my application. This was still hard as I hard to search for any name starting with @ and then add a div and <a> tag, making sure the string was still in good shape for the final output.

140 char limit was an interesting one and I created a great implementation that cuts words over 140 chars. I split the body into an array and counted each letter, if the next piece of the array would exceed 140 chars, I didnt add it. I made this a filter function in Angular.

Pagination was tough too given I had never done it before. While I did find a solution from online, I had to customize it heavily to my needs, which I did.


## Last Words

Thanks Vine for letting me take this on, really appreciate it. It was harder than I thought it would be. I worked hard on this and make several great choices to make the app not only functional by beautiful.

Please shoot me a message if you have questions - bjg226@cornell.edu 

##Credits

For Pagination - [Pagination](http://jsfiddle.net/prash/Cp73s/330/)
For Binding HTML - [BindingHTML](http://stackoverflow.com/questions/18926306/angularjs-ng-bind-html-unsafe-replacement/21979113)