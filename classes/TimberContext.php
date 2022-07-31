<?php

namespace TKTK;

use Timber;

class TimberContext {

	/**
	 * Add the `timber_context` filters.
	 */
	public static function init() {

		add_filter( 'timber_context', array( __CLASS__, 'add_menus' ) );

	}

	public static function add_menus( $context ) {

		$context['menu'] = array(
			'primary' => new Timber\Menu( 'Primary Navigation' ),
			'sample' => new Timber\Menu( 'Sample Navigation' ),
		);

		return $context;

	}

}

TimberContext::init();