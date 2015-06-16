<?php
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2011 Thomas Scheibitz <typo3@scheibitz.com>
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/
/**
 * [CLASS/FUNCTION INDEX of SCRIPT]
 *
 * Hint: use extdeveval to insert/update function index above.
 */


/**
 * Plugin 'Gmap with tt_address' for the 'st_address_map' extension.
 *
 * @author	Thomas Scheibitz <typo3@scheibitz.com>
 * @package	TYPO3
 * @subpackage	tx_staddressmap
 */
class tx_staddressmap_pi1 extends tslib_pibase {
	var $prefixId = 'tx_staddressmap_pi1'; // Same as class name
	var $scriptRelPath = 'pi1/class.tx_staddressmap_pi1.php'; // Path to this script relative to the extension dir.
	var $extKey = 'st_address_map'; // The extension key.
	var $pi_checkCHash = TRUE;
	protected $ttAddressFieldArray = array();

	/**
	 * @param string $field
	 * @return bool
	 */
	protected function isValidDatabaseColumn($field) {
		if (empty($this->ttAddressFieldArray)) {
			$this->ttAddressFieldArray = array_keys($GLOBALS['TYPO3_DB']->admin_get_fields('tt_address'));
		}

		return in_array($field, $this->ttAddressFieldArray);
	}

	/**
	 * The main method of the PlugIn
	 *
	 * @param	string		$content: The PlugIn content
	 * @param	array		$conf: The PlugIn configuration
	 * @return	The content that is displayed on the website
	 */
	function main($conf) {
		$this->conf = $conf;
		$this->pi_setPiVarDefaults();
		$this->pi_loadLL();
		$this->pi_initPIflexForm();
		$errormessage = '';

		$this->conf = $GLOBALS['TSFE']->tmpl->setup['plugin.']['tx_staddressmap_pi1.'];
		$templatefile = ($GLOBALS['TSFE']->tmpl->setup['plugin.']['tx_staddressmap_pi1.']['templateFile']) ? ($GLOBALS['TSFE']->tmpl->setup['plugin.']['tx_staddressmap_pi1.']['templateFile']) : ('EXT:st_address_map/static/template.html');
		$this->templateHtml = $this->cObj->fileResource($templatefile);
		$subpart = $this->cObj->getSubpart($this->templateHtml, '###TEMPLATE###');

		// errorhandling
		$mapsettings = $this->cObj->data['pi_flexform']['data']['sDEF']['lDEF'];
		if (is_array($mapsettings)) {
			foreach ($mapsettings as $key => $value) {
				$$key = reset($value);
				if(reset($value) == '') {
					$errormessage .= $this->checkEmptyFields($key);
					if($errormessage != '') $errormessage .= '<br />';
				}
			}
		}
		if($errormessage != '') return '<div class="error">' . $errormessage . '</div>';

		// set addresslist
		$addresslist = t3lib_div::intExplode(',', $addresslist, TRUE);
		$addresslist = implode(' or pid = ', $addresslist);

		$content_id 		= $this->cObj->data['uid'];
		$layout_style		= $GLOBALS['TSFE']->tmpl->setup['plugin.']['tx_staddressmap_pi1.']['list_style'];
		$tablefields = ($this->conf['tablefields'] == '') ? '' : $this->conf['tablefields'] . ',';

		/* ----- Ajax ----- */
		if(t3lib_div::_GET('type') == $GLOBALS['TSFE']->tmpl->setup['plugin.']['tx_staddressmap_pi1.']['ajaxtypenumb']) {
			$cid = t3lib_div::_GET('cid');
			$hmac = t3lib_div::_GET('hmac');
			if ($hmac !== t3lib_div::hmac($cid, 'st_address_map')) {
				return $this->pi_getLL('nodata');
			}
			return $this->gimmeData(t3lib_div::_GET('v'), $cid, t3lib_div::_GET('t'), $tablefields);
		}

		/* ----- selectfields ----- */
		foreach (preg_split('/\s?,\s?/', $this->conf['dropdownfields']) as $value) {
			$option = '';
			if ($this->isValidDatabaseColumn($value)) {
				$res = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows('hidden,deleted,' . $value, 'tt_address', '(pid = ' . $addresslist . ') AND (hidden=0 AND deleted=0)', $value, $value);
				if ($res && $GLOBALS['TYPO3_DB']->sql_affected_rows($res) != 0) {
					$option = '<select class="tx_staddressmap_select" data-fieldname="' . $value . '"><option value="-1">' . $this->pi_getLL('please_select') . '</option>';
					foreach ($res as $row) {
						$option .= '<option value="' . $row[$value] . '">' . $row[$value] . '</option>';
					}
					$option .= '</select>';
				} else {
					return $this->pi_getLL('nodata');
				}
			}
			$markerArray['###' . strtoupper($value) . '###'] = $option;
		}

		/* ----- inputfields ----- */
		foreach (preg_split('/\s?,\s?/', $this->conf['inputfields']) as $value) {
			$option = '';
			if ($this->isValidDatabaseColumn($value)) {
				$res = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows($value, 'tt_address', 'hidden=0 AND deleted=0', $value, $value);
				if ($res && $GLOBALS['TYPO3_DB']->sql_affected_rows($res) != 0) {
					foreach ($res as $row) {
						$option = '<input class="tx_staddressmap_input" data-fieldname="' . $value . '" value="" />';
					}
				} else {
					return $this->pi_getLL('nodata');
				}
			}
			$markerArray['###' . strtoupper($value) . '###'] = $option;
		}

		/**
		 * generate data attributes
		 */
		$dataAttributes = '';
		if($this->conf['seeatstart'] == 1) {
			$dataAttributes .= ' data-staddressmap-seeatstart="1"';
		}
		$dataAttributes .= ' data-staddressmap-pageid="' . $GLOBALS['TSFE']->id . '"';
		$dataAttributes .= ' data-staddressmap-ajaxtypenumb="' . $GLOBALS['TSFE']->tmpl->setup['plugin.']['tx_staddressmap_pi1.']['ajaxtypenumb'] . '"';
		$dataAttributes .= ' data-staddressmap-cid="' . $content_id . '"';
		$dataAttributes .= ' data-staddressmap-cidhmac="' . htmlspecialchars(t3lib_div::hmac($content_id, 'st_address_map')) . '"';


		/* ----- Map ----- */
		$maps = '<div id="tx_staddressmap_gmap_' . $content_id . '" class="tx_staddressmap_gmap" ' . $dataAttributes . ' style="width: ' . $mapwidth . 'px; height: ' . $mapheight . 'px"></div>';

		/* ----- Mapsjavascript ----- */

		$bubblemarker = ($this->conf['bubblemarker']) ? 'var icon = "' . $this->conf['bubblemarker'] . '";' : 'var icon = "";';
		$GLOBALS['TSFE']->additionalFooterData[$this->extKey . '_665_' . $content_id] = '
			<script type="text/javascript">
			var map;
			var circle = null;
			var circledata = null;
			var marker = new Array();
			var centerpoints = new Array();
			var detailzoom = new Array();
			var city_marker = new Array();
			var city_centerpoints = new Array();
			var city_detailzoom = new Array();
			var region_marker = new Array();
			var region_centerpoints = new Array();
			var region_detailzoom = new Array();
			' . $bubblemarker . '

			function initialize(){
				var latlng = new google.maps.LatLng(' . $center_coordinates . ');
				var myMap_' . $content_id . ' = {
					zoom: ' . $start_zoom . ',
					center: latlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				map = new google.maps.Map(document.getElementById("tx_staddressmap_gmap_' . $content_id . '"), myMap_' . $content_id . ');
			}

			</script>';

		$markerArray['###MAPS###'] = $maps;
		$markerArray['###ADDRESSLIST###'] = '<div id="tx_staddressmap_addresslist_' . $content_id . '" class="tx_staddressmap_addresslist"></div>';

		if($this->conf['searchbutton'] == 1) {
			$markerArray['###SEARCHBUTTON###'] = '<input class="tx_staddressmap_submit" type="submit" value="' . $this->pi_getLL('search') . '" />';
		} else {
			$markerArray['###SEARCHBUTTON###'] = '';
		}


		$content = $this->cObj->substituteMarkerArrayCached($subpart, $markerArray);
		return $this->pi_wrapInBaseClass($content);
	}

	private function checkEmptyFields($key) {
		return $this->pi_getLL('error_empty_' . $key);
	}


	/**
	 * Get geo coordinates from address
	 *
	 * @param string $data
	 * @return array lat, lng
	 */

	function getMapsCoordinates($data){
		$json = t3lib_div::getUrl('https://maps.googleapis.com/maps/api/geocode/json?sensor=false&region=de&address=' . urlencode($data));
		$jsonDecoded = json_decode($json, TRUE);
		if (!empty($jsonDecoded['results'])) {
			$lat = $jsonDecoded['results']['0']['geometry']['location']['lat'];
			$lng = $jsonDecoded['results']['0']['geometry']['location']['lng'];
		} else {
			$lat = 0;
			$lng = 0;
		}
		return array($lat, $lng);
	}

	private function gimmeData($var, $cid, $what, $tablefields) {
		$validDatabaseFields = array();
		foreach (t3lib_div::trimExplode(',', $tablefields, TRUE) as $field) {
			if ($this->isValidDatabaseColumn($field)) {
				$validDatabaseFields[] = $field;
			}
		}

		$this->conf = $GLOBALS['TSFE']->tmpl->setup['plugin.']['tx_staddressmap_pi1.'];

		$subpart = $this->cObj->getSubpart($this->templateHtml, '###ADDRESSLISTS###');
		$singlerow=$this->cObj->getSubpart($subpart, '###ROW###');

		$res = $GLOBALS['TYPO3_DB']->exec_SELECTquery('pi_flexform', 'tt_content', '(hidden=0 and deleted=0) and uid=' . (int)$cid);
		if($res && $GLOBALS['TYPO3_DB']->sql_affected_rows($res) != 0) {
			while($row=$GLOBALS['TYPO3_DB']->sql_fetch_assoc($res)) {
				$flexform	= t3lib_div::xml2array($row['pi_flexform']);
			}
		} else {
			return $this->pi_getLL('nodata');
		}

		foreach ($flexform['data']['sDEF']['lDEF'] as $key => $value) { $$key = reset($value); }
		$rad = ($this->conf['searchradius'] or $this->conf['searchradius'] != 0) ? $this->conf['searchradius'] : '20000';
		// ----- set addresslist ------
		$addresslist = t3lib_div::intExplode(',', $addresslist, TRUE);
		$addresslist = implode(' or pid = ', $addresslist);

		//  ----- radius -----
		$js_circle = 'circledata = null;';
		if(in_array($what, preg_split('/\s?,\s?/', $this->conf['radiusfields']))) {
			// radius
			$rc = ($this->conf['radiuscountry']) ? ',' . $this->conf['radiuscountry'] : '';
			$koord = $this->getMapsCoordinates(t3lib_div::_GET('v') . $rc);

			$radiusSearch =
				'6378.388 * acos('.
					'sin(RADIANS(tx_staddressmap_lng)) * '.
					'sin(RADIANS(' . (float)$koord[1] . ')) + '.
					'cos(RADIANS(tx_staddressmap_lng)) * '.
					'cos(RADIANS(' . (float)$koord[1] . ')) * '.
					'cos(RADIANS(' . (float)$koord[0] . ') - RADIANS(tx_staddressmap_lat))'.
				')';

			$res = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows(
				'uid, ' . (!empty($validDatabaseFields) ? implode(', ', $validDatabaseFields) . ', ' : '') . 'tx_staddressmap_lat, tx_staddressmap_lng, ' . $radiusSearch . ' AS EAdvanced', 'tt_address',
				'(hidden=0 AND deleted=0) AND (pid = ' . $addresslist . ') AND ' . $radiusSearch . ' <= ' . (float)$rad,
				'',
				'EAdvanced'
			);

			// see radius
			if($this->conf['circle'] == 1) {
				$js_circle .= '
					circledata = {
						strokeColor: "' . $this->conf['circleStrokeColor'] . '",
						strokeOpacity: ' . $this->conf['circleStrokeOpacity'] . ',
						strokeWeight: ' . $this->conf['circleStrokeWeight'] . ',
						fillColor: "' . $this->conf['circlefillColor'] . '",
						fillOpacity: ' . $this->conf['circlefillOpacity'] . ',
						map: map,
						center: new google.maps.LatLng(' . $koord['1'] . ', ' . $koord['0'] . '),
						radius: ' . ($rad*1000) . '
					};
				';
			}
		} else {
			if ($this->isValidDatabaseColumn($what)) {
				var_dump($this->conf);
				if ($this->conf['searchPlaceholderBefore.'][$what]) {
					if($this->conf['searchPlaceholderBefore.'][$what] == 1) {$placeholderBefore = '%';}
				} else {
					if ($this->conf['searchPlaceholderBefore'] && $this->conf['searchPlaceholderBefore'] == 1) {$placeholderBefore = '%';}
				}
				if ($this->conf['searchPlaceholderAfter.'][$what]) {
					if($this->conf['searchPlaceholderAfter.'][$what] == 1) {$placeholderAfter = '%';}
				} else {
					if ($this->conf['searchPlaceholderAfter'] && $this->conf['searchPlaceholderAfter'] == 1) {$placeholderAfter = '%';}
				}
				$res = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows(
					'uid, ' . (!empty($validDatabaseFields) ? implode(', ', $validDatabaseFields) . ', ' : '') . 'tx_staddressmap_lat, tx_staddressmap_lng',
					'tt_address',
					'(hidden=0 and deleted=0) and (pid = ' . $addresslist . ') and ' . $what . ' like "' . $placeholderBefore . $GLOBALS['TYPO3_DB']->escapeStrForLike($var, 'tt_address') . $placeholderAfter . '"'
				);
			}
		}

		// see all
		if(t3lib_div::_GET('all') == 1 || t3lib_div::_GET('v') === '-1' || t3lib_div::_GET('v') === '') {
			$orderBy = ($this->isValidDatabaseColumn($this->conf['orderall'])) ? $this->conf['orderall'] : 'city';
			$rad = ($this->conf['searchradius'] or $this->conf['searchradius'] != 0) ? $this->conf['searchradius'] : '20000';
			$res = $GLOBALS['TYPO3_DB']->exec_selectgetRows(
				'uid, ' . (!empty($validDatabaseFields) ? implode(', ', $validDatabaseFields) . ', ' : '') . 'tx_staddressmap_lat, tx_staddressmap_lng',
				'tt_address',
				'(hidden=0 and deleted=0) and (pid = ' . $addresslist . ')',
				'',
				$orderBy
			);
			$js_circle = '';
		}

		if($res && $GLOBALS['TYPO3_DB']->sql_affected_rows($res) != 0) {
			$ji = 0;
			$common_lat = array();
			$common_lng = array();
			$js_output = '<script type="text/javascript">' . "\n";
			$js_output .= 'var a = new Array();' . "\n";

			foreach($res as $row) {
				if($row['tx_staddressmap_lat'] == 0 || $row['tx_staddressmap_lng'] == 0) {
					$newkoord = $this->getMapsCoordinates($row['zip'] . ' ' . $row['city'] . ',' . $row['address'] . ',' . $row['country']);
					$koor_update = array();
					$koor_update['tx_staddressmap_lat'] = $newkoord[0];
					$koor_update['tx_staddressmap_lng'] = $newkoord[1];
					$insert_q = $GLOBALS['TYPO3_DB']->exec_UPDATEquery(
						'tt_address',
						'uid = ' . $row['uid'],
						$koor_update
					);
				}

				// begin js
				$js_output .= 'a[' . $ji . '] = new Object();' . "\n";
				// begin bubbletext
				$bubbletext = '';
				foreach (preg_split('/\s?,\s?/', $this->conf['bubblefields']) as $tvalue) {
					if($row[$tvalue]) {
						$bubblewrap = $this->conf['bubblelayout.'][$tvalue] ? $this->conf['bubblelayout.'][$tvalue] : '|';
						if($tvalue === 'email') {
							$bubbletext .= t3lib_TStemplate::wrap(str_replace(array('<a', "'", '"'), array("tx_addressmap_replace", "|-|", "-|-"), $this->cObj->mailto_makelinks('mailto:' . $row[$tvalue], '')), $bubblewrap);
						} else {
							$bubbletext .= t3lib_TStemplate::wrap(str_replace("\r\n", '<br />', htmlentities($row[$tvalue], ENT_COMPAT, 'UTF-8', 0)), $bubblewrap);
						}
					}
				}

				// list
				foreach (preg_split('/\s?,\s?/', $tablefields) as $tvalue) {
					if($row[$tvalue]) {
						$listwrap = $this->conf['listlayout.'][$tvalue] ? $this->conf['listlayout.'][$tvalue] : '|';
						$markerArray['###' . strtoupper($tvalue) . '###'] = t3lib_TStemplate::wrap(nl2br($row[$tvalue]), $listwrap);
					} else {
						$markerArray['###' . strtoupper($tvalue) . '###'] = '';
					}
				}

				$bubbletext = t3lib_TStemplate::wrap($bubbletext, $this->conf['bubblelayout.']['wrap']);
				$js_output .= 'a[' . $ji . '].name = \'' . $bubbletext . '\'' . "\n";
				$js_output .= 'a[' . $ji . '].lat = ' . $row['tx_staddressmap_lat'] . ';' . "\n";
				$js_output .= 'a[' . $ji . '].lng = ' . $row['tx_staddressmap_lng'] . ';' . "\n";

				// ----- Calculate average coordinates
				$common_lat[] = $row['tx_staddressmap_lat'];
				$common_lng[] = $row['tx_staddressmap_lng'];
				$ji++;

				$markerArray['###DISTANCE###'] = ($this->conf['radiusfields'] != '' && round($row['EAdvanced'], 1) > 0) ? t3lib_TStemplate::wrap(round($row['EAdvanced'], 1) . ' km', $this->conf['listlayout.']['distance']) : '';

				$adresslistrow .= $this->cObj->substituteMarkerArrayCached($singlerow, $markerArray);
			}
			$js_output .= 'marker[0] = a;' . "\n";
			$js_output .= 'centerpoints[0] = new Object();' . "\n";

			if(in_array($what, preg_split('/\s?,\s?/', $this->conf['radiusfields']))) {
				$js_output .= 'centerpoints[0].lat = ' . $koord['1'] . ';' . "\n";
				$js_output .= 'centerpoints[0].lng = ' . $koord['0'] . ';' . "\n";
			} else {
				$js_output .= 'centerpoints[0].lat = ' . ((max($common_lat)+min($common_lat))/2) . ';' . "\n";
				$js_output .= 'centerpoints[0].lng = ' . ((max($common_lng)+min($common_lng))/2) . ';' . "\n";
			}

			$js_output .= 'detailzoom[0] = new Object();' . "\n";
			$js_output .= 'detailzoom[0] = ' . $detail_zoom . ';' . "\n";
			$js_output .= $js_circle;
			$js_output .= '</script>';

		}  else {
			return $this->pi_getLL('nodata') . '<script type="text/javascript">marker = new Array();</script>';
		}

		$subpartArray['###ROW###'] = $adresslistrow;
		$markerArray['###JSOUTPUT###'] = $js_output;

		$content = $this->cObj->substituteMarkerArrayCached($subpart, $markerArray, $subpartArray, array());
		return $this->pi_wrapInBaseClass($content);
	}
}

if (defined('TYPO3_MODE') && $TYPO3_CONF_VARS[TYPO3_MODE]['XCLASS']['ext/st_address_map/pi1/class.tx_staddressmap_pi1.php']) {
	include_once($TYPO3_CONF_VARS[TYPO3_MODE]['XCLASS']['ext/st_address_map/pi1/class.tx_staddressmap_pi1.php']);
}

?>