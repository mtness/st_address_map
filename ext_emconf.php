<?php

/* **************************************************************
 * Extension Manager/Repository config file for ext "st_address_map".
 *
 * Auto generated 03-05-2013 01:27
 *
 * Manual updates:
 * Only the data in the array - everything else is removed by next
 * writing. "version" and "dependencies" must not be touched!
 ************************************************************** */

$EM_CONF[$_EXTKEY] = array(
	'title' => 'Address visualization with Google Maps',
	'description' => 'With the extension st_address_map you are able to show addresses out of tt_address in Google Maps. Further it is possible to show the addresses in a list.',
	'category' => 'plugin',
	'shy' => 0,
	'version' => '0.4.0',
	'dependencies' => 'tt_address',
	'conflicts' => '',
	'priority' => '',
	'loadOrder' => '',
	'module' => '',
	'state' => 'stable',
	'uploadfolder' => 0,
	'createDirs' => '',
	'modify_tables' => '',
	'clearcacheonload' => 0,
	'lockType' => '',
	'author' => 'Thomas Scheibitz',
	'author_email' => 'typo3@scheibitz.com',
	'author_company' => 'scheibitz.com',
	'CGLcompliance' => '',
	'CGLcompliance_note' => '',
	'constraints' => array(
		'depends' => array(
			'typo3' => '4.5.0-6.2.99',
			'tt_address' => '2.3.0-2.3.5',
		),
		'conflicts' => array(
		),
		'suggests' => array(
		),
	),
	'_md5_values_when_last_written' => 'a:23:{s:9:"ChangeLog";s:4:"1704";s:12:"ext_icon.gif";s:4:"8cae";s:17:"ext_localconf.php";s:4:"8a94";s:14:"ext_tables.php";s:4:"268b";s:14:"ext_tables.sql";s:4:"dda4";s:12:"flexform.xml";s:4:"c06d";s:16:"locallang_db.xml";s:4:"a236";s:17:"locallang_tca.php";s:4:"0cc0";s:10:"README.txt";s:4:"96a6";s:14:"doc/manual.sxw";s:4:"3a8d";s:19:"doc/wizard_form.dat";s:4:"c7ce";s:20:"doc/wizard_form.html";s:4:"6039";s:39:"lib/user_st_addressmapOnCurrentPage.php";s:4:"8f73";s:33:"pi1/class.tx_staddressmap_pi1.php";s:4:"d5a8";s:17:"pi1/locallang.xml";s:4:"c742";s:16:"static/style.css";s:4:"4b42";s:20:"static/template.html";s:4:"d9fc";s:23:"static/tx_addressmap.js";s:4:"ec6a";s:46:"static/selectbox/jquery.selectbox-0.1.3.min.js";s:4:"c76e";s:37:"static/selectbox/jquery.selectbox.css";s:4:"8cb8";s:33:"static/selectbox/select-icons.png";s:4:"4490";s:35:"static/st_address_map/constants.txt";s:4:"65b8";s:31:"static/st_address_map/setup.txt";s:4:"e073";}',
	'suggests' => array(
	),
);

?>