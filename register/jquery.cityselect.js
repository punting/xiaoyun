'use strict';

(function ($)
{
    $.fn.citySelect = function (data)
    {
        if (this.length < 1)
        {
            return;
        }

        var boxObj = this;

        var prov = boxObj.find('.city-selector [name=province]')
            .attr('data-item'),
            city = boxObj.find('.city-selector [name=city]')
            .attr('data-item');

        var settings = {
            prov: '',
            city: '',
            provPre:
            {
                text: '全部省份',
                value: '-1'
            },
            cityPre:
            {
                text: '全部城市',
                value: '-1'
            }
        };

        if (prov && '-1' !== prov) settings.prov = prov;
        else if (data && data.prov) settings.prov = data.prov;

        if (city && '-1' !== city) settings.city = city;
        else if (data && data.city) settings.city = data.city;
        var provObj = boxObj.find('.prov');
        var cityObj = boxObj.find('.city');
        var provPre = settings.provPre;
        var cityPre = settings.cityPre;
        var cityJson, tempHtml;

        // 赋值市级函数
        var cityStart = function ()
        {
            var prov_id = provObj.get(0)
                .selectedIndex - 1;
            cityObj.empty()
                .attr('disabled', true);

            if (prov_id < 0 || typeof (cityJson.citylist[prov_id].c) === 'undefined')
            {
                return;
            }

            // 遍历赋值市级下拉列表
            tempHtml = '';
            if (cityPre != null)
            {
                tempHtml += '<option value="' + cityPre.value + '">' + cityPre.text + '</option>';
            }
            $.each(cityJson.citylist[prov_id].c, function (i, city)
            {
                tempHtml += '<option value="' + city.n + '">' + city.n + '</option>';
            });
            cityObj.html(tempHtml)
                .attr('disabled', false);
        };

        // 请求省市json数据
        cityJson = cityData;

        // 遍历赋值省份下拉列表
        tempHtml = '';
        if (provPre != null)
        {
            tempHtml += '<option value="' + provPre.value + '" selected>' + provPre.text + '</option>';
        }
        $.each(cityJson.citylist, function (i, prov)
        {
            tempHtml += '<option value="' + prov.p + '">' + prov.p + '</option>';
        });
        provObj.append(tempHtml);

        // 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
        setTimeout(function ()
        {
            if (settings.prov)
            {
                provObj.val(settings.prov);
                cityStart();
                setTimeout(function ()
                {
                    if (settings.city != null)
                    {
                        cityObj.val(settings.city);
                    }
                }, 1);
            }
        }, 1);

        // 选择省份事件
        provObj.bind('change', function ()
        {
            cityStart();
        });
    };
})(jQuery);

