(function ($, yun)
{
'use strict';
$(document).ready(function ()
{

    $('#lmenu-collapse-shop-manager').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-shop-manager';
        window.sessionStorage.sub_menu = 'lmenu-collapse-shop-manager';
    });


    $('#account').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-account';
        window.sessionStorage.sub_menu = 'account';
    });

    $('#ads-settings').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-ads';
        window.sessionStorage.sub_menu = 'ads-settings';
    });

    $('#ads-stats').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-ads';
        window.sessionStorage.sub_menu = 'ads-stats';
    });

    $('#ads-bill').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-ads';
        window.sessionStorage.sub_menu = 'ads-bill';
    });

    $('#probe-stats').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-stats';
        window.sessionStorage.sub_menu = 'probe-stats';
    });

    $('#visitor-stats').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-stats';
        window.sessionStorage.sub_menu = 'visitor-stats';
    });

    $('#router-total-stats').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-stats';
        window.sessionStorage.sub_menu = 'router-total-stats';
    });

    $('#router-stats').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-stats';
        window.sessionStorage.sub_menu = 'router-stats';
    });


    $('#junior-account').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-account';
        window.sessionStorage.sub_menu = 'junior-account';
    });


    $('#lmenu-collapse-device').click(function ()
    {
        window.sessionStorage.menu = 'lmenu-collapse-device';
        window.sessionStorage.sub_menu = 'lmenu-collapse-device';
    });

    $('#' + window.sessionStorage.menu).addClass('in');
    $('#' + window.sessionStorage.sub_menu).css('background-color','#3d495d');
});
})(jQuery, window.yun);
