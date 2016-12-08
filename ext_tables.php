<?php
if (!defined('TYPO3_MODE')) {
  die ('Access denied.');
}

## WOP:[pi][1][addType]
//\TYPO3\CMS\Core\Utility\GeneralUtility::loadTCA('tt_content');
$TCA['tt_content']['types']['list']['subtypes_excludelist'][$_EXTKEY . '_pi1'] = 'layout,select_key,pages';


## WOP:[pi][1][addType]
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPlugin(array(
  'LLL:EXT:st_address_map/locallang_db.xml:tt_content.list_type_pi1',
  $_EXTKEY . '_pi1',
  \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY) . 'ext_icon.gif'
), 'list_type');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'static/st_address_map/', 'st_address_map');

$TCA['tt_content']['types']['list']['subtypes_addlist'][$_EXTKEY . '_pi1'] = 'pi_flexform';
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue($_EXTKEY . '_pi1',
  'FILE:EXT:' . $_EXTKEY . '/flexform.xml');
?>