mod.wizards.newContentElement.wizardItems.common {
    elements {
            st_address_map {
                iconIdentifier = content-textpic
                title = LLL:EXT:st_address_map/Resources/Private/Language/locallang_db_new_content_el.xlf:wizards.newContentElement.st_address_map_title
                description = LLL:EXT:st_address_map/Resources/Private/Language/locallang_db_new_content_el.xlf:wizards.newContentElement.st_address_map_description
                icon = EXT:st_address_map/Resources/Public/Icons/st_address_map.svg
                tt_content_defValues {
                    CType = staddressmap_st_address_map
                }
            }
    }
    show := addToList(st_address_map)
}
