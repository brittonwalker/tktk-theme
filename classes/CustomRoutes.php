<?php
/**
 * Implements Custom Routes for Static Pages.
 *
 * @package tktk
 */

namespace Tktk;

use Timber\Timber;
use Timber\Pagination;

class CustomRoutes {

    /**
     * Custom pages to register.
     *
     * @var array
     */
    private $custom_pages = [];

    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', [$this, 'add_rewrite_rules']);
        add_filter('query_vars', [$this, 'register_query_vars']);
        add_filter('template_include', [$this, 'load_custom_template']);
    }

    /**
     * Registers custom routes dynamically.
     */
    public function add_rewrite_rules() {
        foreach ($this->custom_pages as $page) {
            add_rewrite_rule("^{$page}/?$", "index.php?{$page}=1", 'top');
        }
    }

    /**
     * Registers custom query variables dynamically.
     *
     * @param array $vars Existing query vars.
     * @return array Modified query vars.
     */
    public function register_query_vars($vars) {
        return array_merge($vars, $this->custom_pages);
    }

    /**
     * Loads the correct template based on the matched route.
     *
     * @param string $template Current template.
     * @return string Modified template path.
     */
    public function load_custom_template($template) {
        foreach ($this->custom_pages as $page) {
            if (get_query_var($page) == 1) {
              $context = Timber::context();

              // Fetch posts only for the `/work/` route
              if ($page === 'work') {
                $paged = get_query_var('paged') ? get_query_var('paged') : 1;

                $query_args = [
                    'post_type'      => ['project', 'research'],
                    'posts_per_page' => 12,
                    'paged'          => $paged,
                ];

                $context['posts'] = Timber::get_posts($query_args);
                $context['pagination'] = new Pagination();
              }

              Timber::render("{$page}.twig", $context);
              exit;
            }
        }

        return $template;
    }
}
