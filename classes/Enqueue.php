<?php
/**
 * Implements Enqueue class for tktk-theme assets
 *
 * @package tktk-theme
 */

namespace Tktk;

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
    public $namespace;

    /**
     * Public constructor
     */
    public function __construct( $namespace ) {
        $this->namespace = $namespace;
        $this->url       = get_stylesheet_directory_uri();

        // Ensure asset file exists before including
        $asset_path = get_stylesheet_directory() . '/build/index.asset.php';
        if ( file_exists( $asset_path ) ) {
            $asset = include $asset_path;
        } else {
            $asset = [];
        }

        // Determine versioning strategy
        if ( strpos( get_site_url(), '.test' ) !== false ) {
            $this->version = time(); // Cache bust in dev
        } else {
            $theme         = wp_get_theme();
            $this->version = is_array( $asset ) && isset( $asset['version'] ) ? $asset['version'] : $theme->get( 'Version' );
        }

        // Hooks
        add_action( 'admin_enqueue_scripts', [ $this, 'admin_styles' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'site_styles' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'site_scripts' ] );
    }

    /**
     * Admin Styles
     */
    public function admin_styles() {
        wp_enqueue_style(
            "{$this->namespace}-admin",
            "{$this->url}/admin-css/css/admin.css",
            [],
            $this->version,
            'screen'
        );
    }

    /**
     * Site Styles
     */
    public function site_styles() {
        wp_enqueue_style(
            $this->namespace,
            get_theme_file_uri( '/build/index.css' ),
            [],
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
            [ 'jquery' ],
            $this->version,
            true
        );
    }
}
