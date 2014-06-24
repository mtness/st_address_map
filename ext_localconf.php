<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
	'Kreativschmiede.' . $_EXTKEY,
	'Pi1',
	array(
		'Adressmap' => 'list',
	),
	// non-cacheable actions
	array(
		'Adressmap' => '',
	)
);
