<?php
$tempColumns = array (
  'tx_staddressmap_st_addressmap_addresselement' =>
  array (
    'config' =>
    array (
      'type' => 'inline',
      'foreign_table' => 'tt_content',
      'foreign_record_defaults' =>
      array (
        'colPos' => '999',
      ),
      'foreign_sortby' => 'sorting',
      'appearance' =>
      array (
        'collapseAll' => '1',
        'levelLinksPosition' => 'top',
        'showSynchronizationLink' => '1',
        'showPossibleLocalizationRecords' => '1',
        'showAllLocalizationLink' => '1',
        'useSortable' => '1',
        'enabledControls' =>
        array (
          'dragdrop' => '1',
        ),
      ),
      'minitems' => '1',
      'maxitems' => '1',
      'behaviour' =>
      array (
        'localizationMode' => 'select',
      ),
      'foreign_field' => 'tx_staddressmap_st_addressmap_addresselement_parent',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:st_address_map/Resources/Private/Language/locallang_db.xlf:tt_content.tx_staddressmap_st_addressmap_addresselement',
  ),
  'tx_staddressmap_st_addressmap_centercoordinates' =>
  array (
    'config' =>
    array (
      'type' => 'input',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:st_address_map/Resources/Private/Language/locallang_db.xlf:tt_content.tx_staddressmap_st_addressmap_centercoordinates',
  ),
  'tx_staddressmap_st_addressmap_detailzoom' =>
  array (
    'config' =>
    array (
      'type' => 'input',
      'eval' => 'int',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:st_address_map/Resources/Private/Language/locallang_db.xlf:tt_content.tx_staddressmap_st_addressmap_detailzoom',
  ),
  'tx_staddressmap_st_addressmap_mapheight' =>
  array (
    'config' =>
    array (
      'type' => 'input',
      'eval' => 'int',
      'placeholder' => '600',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:st_address_map/Resources/Private/Language/locallang_db.xlf:tt_content.tx_staddressmap_st_addressmap_mapheight',
  ),
  'tx_staddressmap_st_addressmap_startzoom' =>
  array (
    'config' =>
    array (
      'type' => 'input',
      'eval' => 'int',
      'placeholder' => '6',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:st_address_map/Resources/Private/Language/locallang_db.xlf:tt_content.tx_staddressmap_st_addressmap_startzoom',
  ),
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', $tempColumns);
$GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][] = array(
    'LLL:EXT:st_address_map/Resources/Private/Language/locallang_db.xlf:tt_content.CType.div._staddressmap_',
    '--div--',
);
$GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][] = array(
    'LLL:EXT:st_address_map/Resources/Private/Language/locallang_db.xlf:tt_content.CType.staddressmap_st_addressmap',
    'staddressmap_st_addressmap',
);
$tempTypes = array (
  'staddressmap_st_addressmap' =>
  array (
    'columnsOverrides' =>
    array (
      'bodytext' =>
      array (
        'defaultExtras' => 'richtext:rte_transform[mode=ts_css]',
      ),
    ),
    'showitem' => '--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.general;general,header,tx_staddressmap_st_addressmap_mapheight,tx_staddressmap_st_addressmap_startzoom,tx_staddressmap_st_addressmap_detailzoom,tx_staddressmap_st_addressmap_centercoordinates,tx_staddressmap_st_addressmap_addresselement,--div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.access,--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.visibility;visibility,--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.access;access,--div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.extended,--div--;LLL:EXT:lang/locallang_tca.xlf:sys_category.tabs.category,categories',
  ),
);
$GLOBALS['TCA']['tt_content']['types'] += $tempTypes;
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    'st_address_map',
    'Configuration/TypoScript/',
    'st_address_map'
);
