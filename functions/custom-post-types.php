<?php
/**
 * Registers a new post type
 *
 * @uses $wp_post_types Inserts new post type object into the list
 *
 * @param string  Post type key, must not exceed 20 characters
 * @param array|string  See optional args description above.
 * @return object|WP_Error the registered post type object, or an error object
 * @package TKTK
 */

namespace TKTK;

add_action( 'init', __NAMESPACE__ . '\\create_post_types' );
/**
 * Create custom post types
 */
function create_post_types() {
	$labels = array(
		'name'               => __( 'Docs', 'tktk' ),
		'singular_name'      => __( 'Doc', 'tktk' ),
		'add_new'            => _x( 'Add New Doc', 'tktk', 'tktk' ),
		'add_new_item'       => __( 'Add New Doc', 'tktk' ),
		'edit_item'          => __( 'Edit Doc', 'tktk' ),
		'new_item'           => __( 'New Doc', 'tktk' ),
		'view_item'          => __( 'View Doc', 'tktk' ),
		'search_items'       => __( 'Search Docs', 'tktk' ),
		'not_found'          => __( 'No Docs found', 'tktk' ),
		'not_found_in_trash' => __( 'No Docs found in Trash', 'tktk' ),
		'parent_item_colon'  => __( 'Parent Doc:', 'tktk' ),
		'menu_name'          => __( 'Docs', 'tktk' ),
	);

	$args = array(
		'labels'              => $labels,
		'exclude_from_search' => false,
		'taxonomies'          => array(),
		'public'              => true,
		'has_archive'         => false,
		'publicly_queryable'  => true,
		'menu_position'       => 15,
		'show_in_rest'        => true,
		'rewrite'             => array(
			'slug'       => 'docs',
			'with_front' => true,
		),
		'supports'            => array(
			'title',
			'thumbnail',
			'editor',
		),
	);

	register_post_type( 'docs', $args );
}
