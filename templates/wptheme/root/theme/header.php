<?php /* Author: {%= author_name %}, {%= author_url %}, {%= grunt.template.today('yyyy') %} */
?><!DOCTYPE html>
<html <?php language_attributes() ?> class="no-js">
<head>
<meta charset="<?php bloginfo('charset') ?>">
<title><?php sq_title() ?></title>
<?php
sq_js('js/libs/modernizr.js');
sq_css();
sq_css('ie.css', $ie='lt IE 8');
?>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="pingback" href="<?php bloginfo('pingback_url') ?>">
<meta name="description" content="<?php sq_description() ?>">
<?php wp_head() ?>
</head>

<body <?php body_class() ?>>

<header class="header">
	<?php sq_logo() ?>
	<nav>
		<?php sq_menu('primary') ?>
	</nav>
</header>
