<?php
if (!defined ('TYPO3_MODE')) {
 	die ('Access denied.');
}

include_once(\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath('st_address_map') . 'lib/user_st_addressmapOnCurrentPage.php'); // Conditions for JS including
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPItoST43($_EXTKEY, 'pi1/class.tx_staddressmap_pi1.php', '_pi1', 'list_type', 1);
?>