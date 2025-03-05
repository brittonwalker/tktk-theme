<?php
/**
 * Implements Styleguide class for /styleguide route.
 *
 * @package tktk
 */

namespace Tktk;

use Timber\Timber;

class Styleguide {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', [$this, 'add_rewrite_rule']);
        add_filter('query_vars', [$this, 'register_query_var']);
        add_filter('template_include', [$this, 'load_styleguide_template']);
    }

    /**
     * Registers the /styleguide route.
     */
    public function add_rewrite_rule() {
        add_rewrite_rule('^styleguide/?$', 'index.php?styleguide=1', 'top');
    }

    /**
     * Registers the 'styleguide' query variable.
     *
     * @param array $vars Existing query vars.
     * @return array Modified query vars.
     */
    public function register_query_var($vars) {
        $vars[] = 'styleguide';
        return $vars;
    }

    /**
     * Loads the custom template for /styleguide and passes data to Timber.
     *
     * @param string $template Current template.
     * @return string Modified template path.
     */
    public function load_styleguide_template($template) {
        if (get_query_var('styleguide') == 1) {
            $context = Timber::context();

            Timber::render('styleguide.twig', $context);
            exit;
        }

        return $template;
    }
}
