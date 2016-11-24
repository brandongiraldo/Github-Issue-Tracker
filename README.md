# GitHub Issue Tracker

![Alt text](/app/assets/screen_shot.png?raw=true)

This project was created as to demonstrate basic AngularJS features and capabilites. This application serves as an npm Issue tracker for GitHub. It will hit GitHub's REST API and show/browse information given by their REST API.

The main URL is [https://api.github.com/repos/npm/npm/issues](https://api.github.com/repos/npm/npm/issues)

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Utilizes grunt and bower, use `sudo npm install -g grunt-cli` to install grunt and `sudo npm install -g bower` for bower.

Then, install bower packages using `sudo bower install --allow-root` and install node packages with `sudo npm install`.

Run `grunt` for building and `grunt serve` for application preview. The application runs on port 9000.

If you wish to configure the port, Gruntfile.js contains server information.

## Hosting

I am currently hosting this application as a subdirectory application on my nginx server.

Its worth noting (since it look me about an hour and half to figure out) that the application `<base href='/'>` will change based on how you choose to route this in your site.conf.

Below ive attached the server block for hosting this application as a subdirectory on my server such that relative links will point to the correct folder location where the node process is running.

```
location /tracker {
    proxy_pass http://localhost:9000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    // this line below is where you would change base in your application
    rewrite ^/tracker/(.*)$ /$1 break;
}
```

And near the top of my index.html file:

```html
<html>
	<head>
		<base href="/tracker/">
		...
	</head>
</html>
```
## Testing

Running `grunt test` will run the unit tests with karma.

