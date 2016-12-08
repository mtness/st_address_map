<?php

$EM_CONF[$_EXTKEY] = array(
    'title' => 'Address visualization with Google Maps',
    'description' => 'With the extension st_address_map you are able to show addresses out of tt_address in Google Maps.',
    'category' => 'fe',
    'author' => 'Thomas Scheibitz',
    'author_email' => 'typo3@scheibitz.com',
    'author_company' => 'scheibitz.com',
    'state' => 'stable',
    'version' => '1.0.0-DEV',
    'constraints' => array(
        'depends' => array(
            'typo3' => '7.6.0-7.6.99',
            'tt_address' => '2.3.0-3.9.9',
        ),
        'conflicts' => array(),
        'suggests' => array(),
    ),
);
