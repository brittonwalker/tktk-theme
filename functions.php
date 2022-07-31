<?php

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

// Setup: theme supports
require_once( __DIR__ . '/classes/Setup.php' );

// Enqueue all styles and js assets
require_once( __DIR__ . '/classes/Enqueue.php' );

// Add to Timber $context to be used throughout the site
require_once( __DIR__ . '/classes/TimberContext.php' );

// Add to CPTs
require_once( __DIR__ . '/functions/custom-post-types.php' );
