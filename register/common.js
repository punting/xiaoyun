function formatDate(timestamp)
{
    if (!timestamp)
        return '';

    var date = new Date(timestamp);

    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1))
                    .slice(-2) + '-' + ('0' + date.getDate())
                    .slice(-2);
}

function addDays(date, days)
{
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);

    return nd;
}

function msieversion()
{
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0 || !!ua.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
        return true;
    }
    else
    { // If another browser,
        return false;
    }
    return false;
}

function JSONToCSVConvertor(data, label, fileName)
{
    var CSV = label + '\r\n';

    for (var i = 0; i < data.length; i++)
    {
        CSV += data[i] + '\r\n';
    }
    CSV.slice(0, -1);

    if (msieversion())
    {
        var IEwindow = window.open();
        IEwindow.document.write('sep=,\r\n' + CSV);
        IEwindow.document.close();
        IEwindow.document.execCommand('SaveAs', true, fileName + '.csv');
        IEwindow.close();
    }
    else
    {
        var blob = new Blob(['\ufeff', CSV],
                {
                    encoding: 'UTF-8',
                    type: 'text/csv;charset=utf-8'
                });
        var blobUrl = URL.createObjectURL(blob);

        var link = document.createElement('a');
        link.href = blobUrl;

        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function selectJsDateTypeChanged(obj)
{
    var type = obj.value;
    var s1, s2;

    if (type === '')
    {
        return;
    }
    else if (type === 'day')
    {
        s1 = jsComGetDateStr('now_date');
        s2 = s1;
    }
    else if (type === 'month')
    {
        s1 = jsComGetDateStr('month_begin');
        s2 = jsComGetDateStr('month_end');
    }
    else if (type === 'week')
    {
        s1 = jsComGetDateStr('now_week_begin');
        s2 = jsComGetDateStr('now_week_end');
    }
    else if (type === 'perWeek')
    {
        s1 = jsComGetDateStr('pre_week_begin');
        s2 = jsComGetDateStr('pre_week_end');
    }
    else if (type === 'year')
    {
        s1 = jsComGetDateStr('year_begin');
        s2 = jsComGetDateStr('year_end');
    }
    else if (type === 'yestoday')
    {
        s1 = jsComGetDateStr('yestoday');
        s2 = s1;
    }
    else if (type === 'perMonth')
    {
        s1 = jsComGetDateStr('pre_month_begin');
        s2 = jsComGetDateStr('pre_month_end');
    }
    else if (type === 'preyear')
    {
        s1 = jsComGetDateStr('pre_year_begin');
        s2 = jsComGetDateStr('pre_year_end');
    }
    else
    {
        s1 = '';
        s2 = '';
    }

    document.getElementById('txt-start-date')
        .value = s1;
    document.getElementById('txt-end-date')
        .value = s2;
    return false;
}

function jsComGetDateStr(ftype_name)
{
    var ret_str, objDate;
    var year, month, day;

    objDate = new Date();
    getDate();

    function getDate()
    {
        year = objDate.getFullYear();
        month = objDate.getMonth() + 1;
        day = objDate.getDate();
    }

    switch (ftype_name)
    {
        case 'now_date': //本日
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
        case 'yestoday': //昨天
            objDate.setDate(objDate.getDate() - 1);
            getDate();
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
        case 'now_week_begin': //本周初
            objDate.setDate(objDate.getDate() + 1 - objDate.getDay());
            getDate();
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
        case 'now_week_end': //本周末
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
        case 'pre_week_begin': //上周初
            objDate.setDate(objDate.getDate() + 1 - 7 - objDate.getDay());
            getDate();
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
        case 'pre_week_end': //上周末
            objDate.setDate(objDate.getDate() - objDate.getDay());
            getDate();
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
        case 'month_begin': //本月初
            ret_str = year + '-' + dateChange(month) + '-01';
            break;
        case 'month_end': //本月末
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
        case 'pre_month_begin': //上月初
            objDate.setMonth(objDate.getMonth() - 1);
            getDate();
            ret_str = year + '-' + dateChange(month) + '-01';
            break;
        case 'pre_month_end': //上月末
            objDate.setMonth(month - 1);
            objDate.setDate(0);
            getDate();
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
        case 'year_begin': //本年初
            ret_str = year + '-01-01';
            break;
        case 'year_end': //本年末
            objDate.setMonth(12);
            objDate.setDate(0);
            ret_str = year + '-12-' + objDate.getDate();
            break;
        case 'pre_year_begin': //上年初
            year = year - 1;
            ret_str = year + '-01-01';
            break;
        case 'pre_year_end': //上年末
            objDate.setYear(objDate.getYear() - 1);
            objDate.setMonth(12);
            objDate.setDate(0);
            getDate();
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
        default: //本日
            ret_str = year + '-' + dateChange(month) + '-' + dateChange(day);
            break;
    }

    return ret_str;
}

function dateChange(data)
{
    return ('0' + data)
        .slice(-2);
}