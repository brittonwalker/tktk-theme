<?php
/**
 * Implements TimberContext class adding to global Timber context
 *
 *  @package tktk-theme
 */

namespace Tktk;

use Timber\Timber;

class TimberContext {

	/**
	 * Add the `timber_context` filters.
	 */
	public function __construct() {
		
		add_filter( 'timber/context', array( __CLASS__, 'add_menus' ) );
	}

	/**
	 * Add Menus to Timber context.
	 */
	public static function add_menus( $context ) {
		// Set all nav menus in context.
		foreach (array_keys(get_nav_menu_locations()) as $location) {
			$menu = Timber::get_menu($location);
			$context[$location] = $menu;
		}

		echo var_dump($context['social']); die;

		return $context;
	}

}
