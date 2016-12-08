mod.wizards.newContentElement.wizardItems.common {
    elements {
            st_addressmap {
                iconIdentifier = content-textpic
                title = LLL:EXT:mask_example/Resources/Private/Language/locallang_db_new_content_el.xlf:wizards.newContentElement.st_addressmap_title
                description = LLL:EXT:mask_example/Resources/Private/Language/locallang_db_new_content_el.xlf:wizards.newContentElement.st_addressmap_description
                tt_content_defValues {
                    CType = maskexample_st_addressmap
                }
            }
    }
    show := addToList(st_addressmap)
}
