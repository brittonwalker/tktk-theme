<?php

namespace TKTK;

/**
* Registers a new post type
* @uses $wp_post_types Inserts new post type object into the list
*
* @param string  Post type key, must not exceed 20 characters
* @param array|string  See optional args description above.
* @return object|WP_Error the registered post type object, or an error object
*/
add_action( 'init', __NAMESPACE__ . '\\create_post_types' );
function create_post_types() {

	// Videos
	$labels = array(
		'name'                => __( 'Docs', 'text-domain' ),
		'singular_name'       => __( 'Doc', 'text-domain' ),
		'add_new'             => _x( 'Add New Doc', 'text-domain', 'text-domain' ),
		'add_new_item'        => __( 'Add New Doc', 'text-domain' ),
		'edit_item'           => __( 'Edit Doc', 'text-domain' ),
		'new_item'            => __( 'New Doc', 'text-domain' ),
		'view_item'           => __( 'View Doc', 'text-domain' ),
		'search_items'        => __( 'Search Docs', 'text-domain' ),
		'not_found'           => __( 'No Docs found', 'text-domain' ),
		'not_found_in_trash'  => __( 'No Docs found in Trash', 'text-domain' ),
		'parent_item_colon'   => __( 'Parent Doc:', 'text-domain' ),
		'menu_name'           => __( 'Docs', 'text-domain' ),
	);

	$args = array(
		'labels'              => $labels,
		'exclude_from_search' => false,
		'taxonomies'          => array(),
		'public'              => true,
        'has_archive'         => false,
        'publicly_queryable'  => true,
		'menu_position'       => 15,
		'show_in_rest' 		  => true,
		'rewrite'             => array(
			'slug' => 'docs',
			'with_front' => true
		),
		'supports'            => array(
			'title', 'thumbnail', 'editor'
		)
	);

	register_post_type( 'docs', $args );

}