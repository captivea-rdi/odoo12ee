# -*- coding: utf-8 -*-
{
    'name': "FloorCity VOIP customization",

    'summary': """
        Adds custom buttons and functionality to the VOIP module.
        """,

    'description': """
        Adds custom buttons and functionality to the VOIP module.
    """,

    'author': "Joe Hill Captivea",
    'website': "https://www.Captivea.us/",

    'category': 'Uncategorized',
    'version': '0.2',

    'depends': ['base','voip', 'sale_management','crm','contacts'],

    'data': [
        'views/resources.xml',
    ],
    'js':'static/src/js/voip_override.js',
    'qweb': ['static/src/xml/dialer_extend.xml',],
}
