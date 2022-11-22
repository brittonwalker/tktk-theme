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
		
		$asset = include get_stylesheet_directory() . '/build/index.asset.php';

		if ( strpos( get_site_url(), '.test' ) !== false ) {
			$this->version = time();
		} else {
			$theme         = wp_get_theme();
			$this->version = is_array( $asset ) ? $asset['version'] : $theme->get( 'Version' );
		}

		add_action( 'admin_enqueue_scripts', array( $this, 'admin_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'site_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'site_scripts' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_scripts' ) );
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
		$asset = include get_stylesheet_directory() . '/build/editor.asset.php';
		$version = is_array( $asset ) && strpos( get_site_url(), '.test' ) !== false ? $asset['version'] : time();
		wp_enqueue_script(
			$this->namespace,
			get_theme_file_uri( '/build/editor.js' ),
			array(
				'jquery',
			),
			$version,
			true
		);
	}

	/**
	 * Site Styles
	 */
	public function site_styles() {
		wp_enqueue_style(
			$this->namespace,
			get_theme_file_uri( '/build/index.css' ),
			false,
			$this->version,
			'screen, print'
		);
	}

	/**
	 * Site Scripts
	 */
	public function site_scripts() {
		wp_enqueue_script(
			$this->namespace,
			get_theme_file_uri( '/build/index.js' ),
			array(
				'jquery',
			),
			$this->version,
			true
		);
	}
}
new Enqueue( 'tktk' );
