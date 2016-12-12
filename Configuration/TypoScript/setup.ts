<INCLUDE_TYPOSCRIPT: source="FILE:EXT:tt_address/static/pi1/setup.txt">

tt_content.staddressmap_st_addressmap = FLUIDTEMPLATE
tt_content.staddressmap_st_addressmap {
    file = EXT:st_address_map/Resources/Private/Templates/TtContent/st_addressmap.html
    dataProcessing.10 = TYPO3\CMS\Frontend\DataProcessing\DatabaseQueryProcessor
    dataProcessing.10 {
        if.isTrue.field = tx_staddressmap_st_addressmap_addresselement
        table = tt_content
        pidInList.field = pid
        where = tx_staddressmap_st_addressmap_addresselement_parent=###uid### AND deleted=0 AND hidden=0 AND 1=1 AND colPos='999'
        orderBy = sorting
        markers {
            uid.field = uid
        }
        as = data_tx_staddressmap_st_addressmap_addresselement
    }

    settings {
        tx_staddressmap {
            googleApiKey = TEXT
            googleApiKey.value = {$plugin.tx_staddressmap.settings.googleApiKey}
        }
    }
}

plugin.tx_ttaddress_pi1 {
	templatePath = EXT:st_address_map/Resources/Private/Templates/TtAddress/
	templates.addressmap < plugin.tx_ttaddress_pi1.templates.default

	templates.addressmap {

		subparts {
			latitude.cObject = TEXT
			latitude.cObject.field = latitude

			longitude.cObject = TEXT
			longitude.cObject.field = longitude
		}
	}
}

page {
	includeCSS.staddressmap = EXT:st_address_map/Resources/Public/Stylesheets/staddressmap.css

	footerData.876 = COA
	footerData.876 {
		stdWrap.noTrimWrap = |<script |></script>|
		10 = TEXT
		10.stdWrap.dataWrap = data-main="{$PATH.JAVASCRIPTS}/staddressmap"
		10.stdWrap.noTrimWrap = || |
		20 = TEXT
		20.stdWrap.dataWrap = src="{$PATH.JAVASCRIPTS}/Vendor/require.js"
		20.stdWrap.noTrimWrap = || |
	}
}

