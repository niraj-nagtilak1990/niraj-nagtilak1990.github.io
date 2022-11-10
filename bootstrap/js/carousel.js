// adjust top padding for recongnitions slide which as small lines.
$(window).resize(function () {
  addPaddingToSmallTextSpans();
});

$(document).ready(function () {
  addPaddingToSmallTextSpans();
});

function addPaddingToSmallTextSpans() {
  if ($(window).width() > 768) {
    return;
  }

  var carouselHeight = $(".carousel").height();
  $(".carousel span").each(function (index) {
    var $hiddenDiv = $('<div id="hiddenDiv"></div>').hide();
    $("body").append($hiddenDiv);
    $hiddenDiv.append($(this).clone());
    var diff = carouselHeight - $hiddenDiv.height();
    $hiddenDiv.remove();

    if (diff > 100 && !$(this).hasClass("long-text")) {
      $(this).parent().css("margin-top", "100px");
    }
  });
}
