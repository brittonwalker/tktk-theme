<?php

namespace Tktk;

class StyleguideRoutes {

	public function __construct() {
		add_action('init', [$this, 'add_rewrite_rules']);
		add_filter('query_vars', [$this, 'register_query_vars']);
		add_filter('template_include', [$this, 'load_template']);
		add_action('wp_enqueue_scripts', [$this, 'enqueue_assets']);

	}

	public function add_rewrite_rules() {
		add_rewrite_rule('^styleguide/?$', 'index.php?styleguide=1', 'top');
		add_rewrite_rule('^styleguide(?:/(.+))?/?$', 'index.php?styleguide=1&styleguide_page=$matches[1]', 'top');
	}

	public function register_query_vars($vars) {
		$vars[] = 'styleguide';
		$vars[] = 'styleguide_page';
		return $vars;
	}

	public function load_template($template) {
		if (get_query_var('styleguide') != 1) {
			return $template;
		}

		$custom_template = locate_template('styleguide.php');
		return $custom_template ? $custom_template : $template;
	}

	public function enqueue_assets() {
		if (get_query_var('styleguide') != 1) {
			return;
		}

		// Enqueue styleguide.js with asset dependencies
		$asset_path = get_theme_file_path('/build/styleguide.asset.php');
		if (file_exists($asset_path)) {
			$asset = include $asset_path;

			wp_enqueue_script(
				'tktk-styleguide',
				get_theme_file_uri('/build/styleguide.js'),
				$asset['dependencies'] ?? [],
				$asset['version'] ?? filemtime(get_theme_file_path('/build/styleguide.js')),
				true
			);
		}

		// Enqueue optional styleguide.css if it exists
		// $style_path = get_theme_file_path('/build/styleguide.css');
		// if (file_exists($style_path)) {
		// 	wp_enqueue_style(
		// 		'tktk-styleguide',
		// 		get_theme_file_uri('/build/styleguide.css'),
		// 		[],
		// 		filemtime($style_path),
		// 		'all'
		// 	);
		// }
	}
}
