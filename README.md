# vine-issue-tracker

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview. This application runs on port 9000 and requires the connect-modrewrite library. With npm install `connect-modrewrite --save-dev` Run grunt for building and grunt server to run locally on port 9000.

If you wish to configure the port, Gruntfile.js contains server information.

## Testing

Running `grunt test` will run the unit tests with karma.

## Design Choices

When I was reading the description of this project, I had a vision for what it would look like. I did a demo with angular that was not too far away from this.

I went with 9 cells per page, the number can be changed in the main.js controller. I went with 9 because it seemed like a good fit, and was a perfect square.

I tried to go for a blend of Twitter, Vine and Instagram. Subtle borders and background make the while tiles pop. The varying colors in titles and desc. makes and subtle and better UX.

## Technical Choices

This was the perfect assignment for angular. Hitting the JSON url and parsing it in JavaScript just go hand in hand. I asked if JS would be disabled, I was told it would not be.

I used Yo Angular Generator to get up and running fast, I started with routes and the controllers. It was simple given there was only 2 pages.

I leveraged the Grid System in Bootstrap and Angular's ngRoute, made good use of the Pagination and HTML Binding functionality from the Internet (See Credits).

## Design Drawbacks

Due to time constraints I was not able to better the UX on mobile. Some placement issues exist where comments appear, and not all CSS bugs were ironed out on mobile. Given more time, these would have been resolved.

## Technical Drawbacks

Yo Angular Generator was a mess. So many bloat things I didn't need, and some angular libraries that wouldn't install properly. I think I spent more tome configuring Grunt than working design. Biggest setback was then fact Grunt wouldn't allow me to install libraries. I Google'd for hours, and didn't find a solution. I went the alternative route of just implementing directives and functions instead.

## Features

Search is a cool feature that was easy to implement with angular. I also used pagination like I said before.

## Bugs

I mention some in the code documentation but to recap, CSS problems, getting comments from the API was wrong.

## Technical Problems

Everything was going smoothly until I needed to fetch the @name in the JSON and then add an anchor tag to it. I am no angular master, so for me this was a new challenge.

I solved it by generating HTML over the text, and then using the HTML literal in my application. This was still hard as I hard to serach for any name starting with @ and then add a div and <a> tag, making sure the string was still in good shape for the final output.

140 char limit was an interesting one but I honestly didnt have time. I cheated and used angular filerTo : 137 chars. I appened 3 dots afterwards...

Pagination was tough too given I had never done it before.


## Last Words

Thanks Vine for letting me take this on, really appreciate it! It was harder than I thought it would be. I worked hard on this and make several great choices to make the app not only functional by beautiful.

Please shoot me a message if you have questions!!! bjg226@cornell.edu 

##Credits

For Pagination - [Pagination](http://jsfiddle.net/prash/Cp73s/330/)
For Binding HTML - [BindingHTML](http://stackoverflow.com/questions/18926306/angularjs-ng-bind-html-unsafe-replacement/21979113)