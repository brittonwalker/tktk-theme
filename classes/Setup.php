<?php
/**
 * Implements Setup class
 *
 * @package tktk-theme
 */

namespace Tktk;

use Timber\Timber;
use Twig\Extension\StringLoaderExtension;
use Twig\TwigFilter;

class Setup {

    /** Constructor */
    public function __construct() {
        add_action( 'after_setup_theme', [ $this, 'theme_supports' ] );
        add_filter( 'timber/twig', [ $this, 'add_to_twig' ] );
    }

    /** Add theme supports. */
    public function theme_supports() {
        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        // Let WordPress manage the document title.
        add_theme_support( 'title-tag' );

        // Enable support for Post Thumbnails on posts and pages.
        add_theme_support( 'post-thumbnails' );

        // Enable HTML5 markup support.
        add_theme_support(
            'html5',
            [
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            ]
        );

        // Enable support for Post Formats.
        add_theme_support(
            'post-formats',
            [
                'aside',
                'image',
                'video',
                'quote',
                'link',
                'gallery',
                'audio',
            ]
        );

        // Enable support for menus.
        add_theme_support( 'menus' );
    }

    /** Custom Twig filter example */
    public function myfoo( $text ) {
        return $text . ' bar!';
    }

    /** Add custom functions to Twig */
    public function add_to_twig( $twig ) {
        // Ensure Timber is available before modifying Twig
        if ( ! class_exists( Timber::class ) ) {
            return $twig;
        }

        $twig->addExtension( new StringLoaderExtension() );
        $twig->addFilter( new TwigFilter( 'myfoo', [ $this, 'myfoo' ] ) );
        return $twig;
    }
}
