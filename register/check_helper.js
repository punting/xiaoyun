(function ($, yun)
{
    'use strict';
    $(document).ready(function ()
    {
        (function init()
        {
            $('#input-email').change(checkEmail);

            $('#input-password').change(checkPassword);

            $('#input-ensure-password').change(function ()
            {
                if ($('#input-ensure-password').val() !== $('#input-password').val()) {
                    return $('#ensure-password-check-warning').text('密码输入不一致！');
                }
                $('#ensure-password-check-warning').text('');
            });

            function checkPassword ()
            {
                var password = $('#input-password').val();
                if (password.length < 6) return $('#password-check-warning').text('密码少于6个字符！');
                if (password.length > 20) return $('#password-check-warning').text('密码大于20个字符！');
                return $('#password-check-warning').text('');
            }

            function checkEmail()
            {
                var reg = /^([a-z0-9])+@([a-z0-9])+[\.][a-z]{2,3}$/;
                var email = $('#input-email').val();
                if (!email || !reg.test(email)) return $('#email-check-warning').text('请输入正确的邮箱！');

                if ($('#email-check-warning').text()) $('#email-check-warning').text('');

                $.get('/register/email/check/' + email).done(function (response)
                {
                    if (response === 'exists') return $('#email-check-warning').text('该邮箱已被注册！');
                });
            }
        })();
    });
})(jQuery, window.yun);

function formCheck ()
{
    if ($('#email-check-warning') && $('#email-check-warning').text()) {
        toastr.warning($('#email-check-warning').text());
        $('#input-email').focus();
        return false;
    }

    if ($('#password-check-warning') && $('password-check-warning').text()) {
        toastr.warning($('#password-check-warning').text());
        $('#input-password').focus();
        return false;
    }
    if ($('#ensure-password-check-warning') && $('ensure-password-check-warning').text()) {
        toastr.warning($('#ensure-password-check-warning').text());
        $('#input-ensure-password').focus();
        return false;
    }
    return true;
};