
# Welcome to the repository for TKTK theme

1. [Setting up your WordPress with Laravel Valet](#setting-up-your-wordPress-with-laravel-valet)
2. [Installing the Theme](#Installing-the-Theme)
3. [Starting your development](#Starting-your-development)
4. [What's here?](#What's-here)
5. [Resources](#resources)

## Setting up your WordPress with Laravel Valet

1. Create a folder for your project.
2. In the root of your project folder, install WordPress with `wp core download --skip-content`
3. Create your `wp-config.php` file and paste the contents of `wp-config-sample.php`
4. Using Sequel Pro or DBngin, create your database. Overwrite the connection in `wp-config.php`:

    ```php
    define( 'DB_NAME', 'tktk-theme' ); // Name should match the name you created
    
    /** MySQL database username */
    define( 'DB_USER', 'root' );
    
    /** MySQL database password */
    define( 'DB_PASSWORD', '' );
    
    /** MySQL hostname */
    define( 'DB_HOST', 'localhost' );
    ```

5. In the root of your project folder run:

    ```bash
    wp core install --url=yoursiteurl.test --title="Your site title" --admin_user=admin --admin_password=admin --admin_email=you@youremail.com --skip-themes
    ```

6. Navigate to the url you passed to the install command. Use the user and password you passed to the command at `yoursite.url/wp-admin` to login to the dashboard.

## Installing the Theme

Install this theme as you would any other, and be sure the Timber plugin is activated. But hey, let's break it down into some bullets:

1. Make sure you have installed the plugin for the [Timber Library](https://wordpress.org/plugins/timber-library/) (and Advanced Custom Fields - they [play quite nicely](https://timber.github.io/docs/guides/acf-cookbook/#nav) together). 
2. Download the zip for this theme (or clone it) and move it to `wp-content/themes` in your WordPress installation.
3. Rename the folder to something that makes sense for your website (generally no spaces and all lowercase). You could keep the name `tktk-theme` but the point of a starter theme is to make it your own!
4. Activate the theme in Appearance >  Themes.
5. Do your thing! And read [the docs for Timber](https://timber.github.io/docs/). Check out [TKTK components](https://tktk.brittonwalker.site/components/).

## Starting your development

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start watch task for asset development:

    ```bash
    npm run start
    ```

3. To build your final assets:

    ```bash
    npm run build
    ```

## What's here?

`views/` contains all of your Twig templates. These pretty much correspond 1 to 1 with the PHP files that respond to the WordPress template hierarchy. At the end of each PHP template, you'll notice a `Timber::render()` function whose first parameter is the Twig file where that data (or `$context`) will be used. Just an FYI.

`src/` contains all the CSS and JS files needed to run your `start` and `build` commands defined in your `package.json`. This theme uses `@wordpress/scripts`. When the commands are run, it will create a `build` folder that contains your compiled CSS and JS assets. The `classes/Enqueue.php` has already been configured to enqueue the assets in the build folder.

## Resources

* [This branch](https://github.com/laras126/timber-starter-theme/tree/tackle-box) of the starter theme has some more example code with ACF and a slightly different set up.
* [Twig for Timber Cheatsheet](http://notlaura.com/the-twig-for-timber-cheatsheet/)
* [Timber and Twig Reignited My Love for WordPress](https://css-tricks.com/timber-and-twig-reignited-my-love-for-wordpress/) on CSS-Tricks
* [A real live Timber theme](https://github.com/laras126/yuling-theme).
* [Timber Video Tutorials](http://timber.github.io/timber/#video-tutorials) and [an incomplete set of screencasts](https://www.youtube.com/playlist?list=PLuIlodXmVQ6pkqWyR6mtQ5gQZ6BrnuFx-) for building a Timber theme from scratch.
* [TKTK Component Library](https://tktk.brittonwalker.site/components/)