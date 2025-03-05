<?php
/**
 * The tktk theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package tktk
 */

use Timber\Timber;
use Tktk\Setup;
use Tktk\Enqueue;
use Tktk\TimberContext;
use Tktk\Styleguide;

// Load Composer dependencies
if ( file_exists(__DIR__ . '/vendor/autoload.php') ) {
    require_once __DIR__ . '/vendor/autoload.php';
}

// Initialize Timber if available
if ( class_exists(Timber::class) ) {
    Timber::init();
} else {
    add_action('admin_notices', function () {
        echo '<div class="error"><p>Timber is not installed. Please run <code>composer install</code>.</p></div>';
    });
}

new Setup();
new Enqueue( 'tktk' );
new TimberContext();
new Styleguide();