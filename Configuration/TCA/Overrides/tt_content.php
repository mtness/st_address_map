<?php
$tempColumns = array (
  'tx_maskexample_st_addressmap_addresslist' => 
  array (
    'config' => 
    array (
      'type' => 'select',
      'renderType' => 'selectSingleBox',
      'foreign_table' => 'sys_category',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:mask_example/Resources/Private/Language/locallang_db.xlf:tt_content.tx_maskexample_st_addressmap_addresslist',
  ),
  'tx_maskexample_st_addressmap_centercoordinates' => 
  array (
    'config' => 
    array (
      'type' => 'input',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:mask_example/Resources/Private/Language/locallang_db.xlf:tt_content.tx_maskexample_st_addressmap_centercoordinates',
  ),
  'tx_maskexample_st_addressmap_detailzoom' => 
  array (
    'config' => 
    array (
      'type' => 'input',
      'eval' => 'int',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:mask_example/Resources/Private/Language/locallang_db.xlf:tt_content.tx_maskexample_st_addressmap_detailzoom',
  ),
  'tx_maskexample_st_addressmap_mapheight' => 
  array (
    'config' => 
    array (
      'type' => 'input',
      'eval' => 'int',
      'placeholder' => '600',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:mask_example/Resources/Private/Language/locallang_db.xlf:tt_content.tx_maskexample_st_addressmap_mapheight',
  ),
  'tx_maskexample_st_addressmap_mapwidth' => 
  array (
    'config' => 
    array (
      'type' => 'input',
      'eval' => 'int',
      'placeholder' => '600',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:mask_example/Resources/Private/Language/locallang_db.xlf:tt_content.tx_maskexample_st_addressmap_mapwidth',
  ),
  'tx_maskexample_st_addressmap_startzoom' => 
  array (
    'config' => 
    array (
      'type' => 'input',
      'eval' => 'int',
      'placeholder' => '6',
    ),
    'exclude' => '1',
    'label' => 'LLL:EXT:mask_example/Resources/Private/Language/locallang_db.xlf:tt_content.tx_maskexample_st_addressmap_startzoom',
  ),
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', $tempColumns);
$GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][] = array(
    'LLL:EXT:mask_example/Resources/Private/Language/locallang_db.xlf:tt_content.CType.div._maskexample_',
    '--div--',
);
$GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][] = array(
    'LLL:EXT:mask_example/Resources/Private/Language/locallang_db.xlf:tt_content.CType.maskexample_st_addressmap',
    'maskexample_st_addressmap',
);
$tempTypes = array (
  'maskexample_st_addressmap' => 
  array (
    'columnsOverrides' => 
    array (
      'bodytext' => 
      array (
        'defaultExtras' => 'richtext:rte_transform[mode=ts_css]',
      ),
    ),
    'showitem' => '--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.general;general,header,tx_maskexample_st_addressmap_mapheight,tx_maskexample_st_addressmap_mapwidth,tx_maskexample_st_addressmap_startzoom,tx_maskexample_st_addressmap_detailzoom,tx_maskexample_st_addressmap_centercoordinates,tx_maskexample_st_addressmap_addresslist,--div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.access,--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.visibility;visibility,--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.access;access,--div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.extended,--div--;LLL:EXT:lang/locallang_tca.xlf:sys_category.tabs.category,categories',
  ),
);
$GLOBALS['TCA']['tt_content']['types'] += $tempTypes;
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    'mask_example',
    'Configuration/TypoScript/',
    'mask_example'
);
