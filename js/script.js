/* Author: Daniël W. Crompton

 */

$(document).ready(function () {
    $("#homebutton").bind({
        click:function () {
            location.hash = $(this).attr("href");
        }
    });
    $("#aboutbutton").bind({
        click:function () {
            const page = "about";
            location.hash = page;

            $(".textpane").hide();
            $("#" + page).show();
            $("#title").css('backgroundPosition', '-123px -42px');
            $("#title").width("201px");
            $("#title").css('margin-left', ($("#home").width() / 2) - ($("#title").width() / 2));

            trackEvent(page, "click");
        }
    });
    $("#agendabutton").bind({
        click:function () {
            const page = "agenda";
            location.hash = page;

            $(".textpane").hide();
            $("#" + page).show();
            $("#title").css('backgroundPosition', '-337px -42px');
            $("#title").width("90px");
            $("#title").css('margin-left', ($("#home").width() / 2) - ($("#title").width() / 2));

            trackEvent(page, "click");
        }
    });
    $("#contactbutton").bind({
        click:function () {
            const page = "contact";
            location.hash = page;

            $(".textpane").hide();
            $("#" + page).show();
            $("#title").css('backgroundPosition', '-614px -42px');
            $("#title").width("91px");
            $("#title").css('margin-left', ($("#home").width() / 2) - ($("#title").width() / 2));

            trackEvent(page, "click");
        }
    });
    $("#togetherbutton").bind({
        click:function () {
            const page = "together";
            location.hash = page;

            $(".textpane").hide();
            $("#" + page).show();
            $("#title").css('backgroundPosition', '-444px -42px');
            $("#title").width("149px");
            $("#title").css('margin-left', ($("#home").width() / 2) - ($("#title").width() / 2));

            trackEvent(page, "click");
        }
    });
    $(".link").click(function (event) {
        var url = $(this).attr("href");
        recordLink(url, "OutBoundLinks", $(this).attr("id"));
    });

    $(window).hashchange();

    $("div.timeago").timeago();
});

function animate() {
    const whois = "#whois";
    const tips = "#tips";

    $("#textpane").stop().animate({
        opacity:1,
        top:$(whois).position().top,
        left:$(whois).position().left,
        width:760,
        height:$(tips).height() - 17
    });
}

$(window).hashchange(function (event) {
    switch (location.hash) {
        case '#home':
            $('#textpane').fadeOut('slow');
            break;
        case '#tumblr':
            $(".textpane").hide();
            $("#tumblr").show();
            $("#title").hide();
            $('#textpane').show();
            $("#textpane").css('top', $(whois).position().top);
            $("#textpane").css('left',$(whois).position().left);
            $("#textpane").width(760);
            $("#textpane").height($(tips).height() - 17);
            break;
        default :
            console.log(location.hash);
            $("#title").show();
            $(location.hash + "button").click();
            animate();
            $('#textpane').fadeIn('slow');
    }
});

function trackEvent(category, action) {
    try {
        //noinspection JSUnresolvedFunction
        _gat._getTrackerByName()._trackEvent(category, action);
    } catch(e) {

    };
}

function recordLink(link, category, action) {
    trackEvent(category, action);
    setTimeout('window.open("' + link + '")', 100);
}

function twitter(data) {
    $.each(data, function (i, item) {
        var date = new Date(item.created_at);
        item.utc = date.toISOString().replace(new RegExp("\.[0-9][0-9][0-9]Z$"), "-00:00Z");
        var post = ich.twitteritem(item);
        $("#twitter .headerbox").append(post);
        if (i > 1) {
            exit();
        }
        ;
    });
}

function tumblr(data) {
    $.each(data.response.posts, function (i, item) {
        var date = new Date(item.date);
        item.utc = date.toISOString().replace(new RegExp("\.[0-9][0-9][0-9]Z$"), "-00:00Z");
        if (item.tags[0] == "tips") {
            var post = ich.tipsitem(item);
            $("#tips .headerbox").append(post);
        }
        if (item.tags[0] == "activiteit") {
            var post = ich.activityitem(item);
            $("#activity .headerbox").append(post);
        }
    });
}


ich.refresh();


window.mamanoord = true;



