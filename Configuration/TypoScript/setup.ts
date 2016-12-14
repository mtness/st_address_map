<INCLUDE_TYPOSCRIPT: source="FILE:EXT:tt_address/static/pi1/setup.txt">

tt_content.staddressmap_st_address_map = FLUIDTEMPLATE
tt_content.staddressmap_st_address_map {
    file = EXT:st_address_map/Resources/Private/Templates/TtContent/st_address_map.html
    dataProcessing.10 = TYPO3\CMS\Frontend\DataProcessing\DatabaseQueryProcessor
    dataProcessing.10 {
        if.isTrue.field = tx_staddressmap_addresses
        table = tt_content
        pidInList.field = pid
        where = tx_staddressmap_addresses_parent=###uid### AND deleted=0 AND hidden=0 AND 1=1 AND colPos='999' AND CType='list'
        orderBy = sorting
        markers {
            uid.field = uid
        }
        as = data_tx_staddressmap_addresses
    }

    settings {
        tx_staddressmap {
            googleApiKey = {$plugin.tx_staddressmap.settings.googleApiKey}
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

            markertitle.cObject = TEXT
            markertitle.cObject.field = name
        }
    }
}

page {
    includeCSS.staddressmap = EXT:st_address_map/Resources/Public/Stylesheets/staddressmap.css

    footerData.876 = COA
    footerData.876 {
        stdWrap.noTrimWrap = |<script |></script>|
        10 = TEXT
        10.stdWrap.dataWrap = data-main="{$plugin.tx_staddressmap.settings.javascripts}/staddressmap"
        10.stdWrap.noTrimWrap = || |
        20 = TEXT
        20.stdWrap.dataWrap = src="{$plugin.tx_staddressmap.settings.javascripts}/Vendor/require.js"
        20.stdWrap.noTrimWrap = || |
    }
}

