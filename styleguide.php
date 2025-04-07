<?php
/**
 * Template for styleguide routes (/styleguide and subpages)
 */

use Timber\Timber;

$current_slug = get_query_var('styleguide_page');

$context = Timber::context();
$context['styleguide_menu'] = get_styleguide_sections_recursive('', '', $current_slug);

$subpage = get_query_var('styleguide_page');

if ($subpage) {
    $context['section'] = $subpage;
    
    $parts = explode('/', $subpage);
    $last = end($parts);
    $context['title'] = ucwords(str_replace(['-', '_'], ' ', $last));

    $data_path = get_template_directory() . "/views/styleguide/{$subpage}/data.json";
    if (file_exists($data_path)) {
        $json_data = json_decode(file_get_contents($data_path), true);
        if ($json_data) {
            $context['data'] = $json_data;
        }
    }

    $template_path = "styleguide/{$subpage}/template.twig";
    if (locate_template("views/{$template_path}")) {

        Timber::render($template_path, $context);
    } else {
        Timber::render("styleguide/section.twig", $context); // Fallback
    }
} else {
    Timber::render("styleguide.twig", $context);
}


function get_styleguide_sections_recursive($base_path = '', $url_prefix = '', $current_slug = '') {
  $full_path = get_template_directory() . '/views/styleguide' . $base_path;
  $sections = [];

  if (!is_dir($full_path)) {
      return $sections;
  }

  foreach (scandir($full_path) as $item) {
      if ($item === '.' || $item === '..') continue;

      $item_path = $full_path . '/' . $item;
      $relative_path = ltrim($base_path . '/' . $item, '/');
      $url = '/styleguide' . $url_prefix . '/' . $item;

      if (is_dir($item_path)) {
          // Check if it has a template.twig — it’s a renderable section
          $has_template = file_exists($item_path . '/template.twig');

          $children = get_styleguide_sections_recursive(
              $base_path . '/' . $item,
              $url_prefix . '/' . $item,
              $current_slug
          );

          if ($has_template || !empty($children)) {
              $section = [
                  'slug' => $relative_path,
                  'title' => ucwords(str_replace(['-', '_'], ' ', $item)),
                  'link' => $url,
                  'is_active' => ($relative_path === $current_slug),
              ];

              if (!empty($children)) {
                  $section['children'] = $children;
              }

              $sections[] = $section;
          }
      }
  }

  return $sections;
}
