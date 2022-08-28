<?php
/**
 * Implements Enqueue class for tktk-theme assets
 *
 *  @package tktk-theme
 */

namespace TKTK;

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
class Enqueue {

	/**
	 * @var string $version
	 */
	public $version = '';

	/**
	 * @var string $url
	 */
	public $url = '';

	/**
	 * @var string $namespace
	 */
	public $namespace = null;

	/**
	 * Public constructor
	 */
	public function __construct( $namespace ) {
		$this->namespace = $namespace;

		$this->url = get_stylesheet_directory_uri();

		if ( $this->is_development() ) {
			$this->version = time();
		} else {
			$theme         = wp_get_theme();
			$this->version = $theme->get( 'Version' );
		}

		add_action( 'admin_enqueue_scripts', array( $this, 'admin_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'site_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'site_scripts' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_scripts' ) );
	}

	/**
	 * Is development environment?
	 *
	 * @return boolean
	 */
	public function is_development() {
		if ( strpos( get_site_url(), '.test' ) !== false ) {
			return true;
		}

		return false;
	}

	/**
	 * Admin Styles
	 */
	public function admin_styles() {
		wp_enqueue_style(
			"{$this->namespace}-admin",
			"{$this->url}/admin-css/css/admin.css",
			false,
			$this->version,
			'screen'
		);
	}

	/**
	 * Editor Scripts
	 */
	public function editor_scripts() {
		if ( $this->is_development() ) {
			wp_enqueue_script(
				$this->namespace,
				get_theme_file_uri( '/build/editor.js' ),
				array(
					'jquery',
				),
				false,
				true
			);
		} else {
			wp_enqueue_script(
				$this->namespace,
				get_theme_file_uri( '/build/editor.js' ),
				array(
					'jquery',
				),
				false,
				true
			);
		}
	}

	/**
	 * Site Styles
	 */
	public function site_styles() {
		if ( $this->is_development() ) {
			wp_enqueue_style(
				$this->namespace,
				get_theme_file_uri( '/build/index.css' ),
				false,
				time(),
				'screen, print'
			);
		} else {
			wp_enqueue_style(
				$this->namespace,
				get_theme_file_uri( '/build/index.css' ),
				false,
				$this->version,
				'screen, print'
			);
		}
	}

	/**
	 * Site Scripts
	 */
	public function site_scripts() {
		if ( $this->is_development() ) {
			wp_enqueue_script(
				$this->namespace,
				get_theme_file_uri( '/build/index.js' ),
				array(
					'jquery',
				),
				false,
				true
			);
		} else {
			wp_enqueue_script(
				$this->namespace,
				get_theme_file_uri( '/build/index.js' ),
				array(
					'jquery',
				),
				false,
				true
			);
		}
	}
}
new Enqueue( 'tktk' );
