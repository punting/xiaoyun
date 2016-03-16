(function ($, yun)
{
    'use strict';
    $(document).ready(function ()
    {
        $('#city-selector').citySelect();
        $('#input-ensure-password').change(function ()
        {
            if ($('#input-ensure-password').val() !== $('#input-password').val()) {
                return $('#password-diff').show();
            }
            $('#password-diff').hide();
        });
    });
})(jQuery, window.yun);

