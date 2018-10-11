var APP = function () {

  // PATHS
  // ======================
  //this.ASSETS_PATH = '../../assets/';
  this.ASSETS_PATH = './assets/';
  this.SERVER_PATH = this.ASSETS_PATH + 'demo/server/';

  // GLOBAL HELPERS
  // ======================
  this.is_touch_device = function () {
    return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
  };
};

var APP = new APP();

// APP UI SETTINGS
// ======================

APP.UI = {
  scrollTop: 0, // Minimal scrolling to show scrollTop button
};


// Hide sidebar on small screen
$(window).on('load resize scroll', function () {
  if ($(this).width() < 992) {
    $('body').addClass('sidebar-mini');
  }
});


$(function () {

  // TOGGLE THEME-CONFIG BOX    
  $('.theme-config-toggle').on('click', function () {
    $(this).parents('.theme-config').toggleClass('opened');
  });

  // LAYOUT SETTINGS
  // ======================

  // fixed layout
  $('#_fixedlayout').change(function () {
    if ($(this).is(':checked')) {
      $('body').addClass('fixed-layout');
      $('#sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: '0.9',
      });
    } else {

      $('#sidebar-collapse').slimScroll({
        destroy: true
      }).css({
        overflow: 'visible',
        height: 'auto'
      });
      $('body').removeClass('fixed-layout');
    }
    
  });


  // fixed navbar
  $('#_fixedNavbar').change(function () {
    if ($(this).is(':checked')) $('body').addClass('fixed-navbar');
    else $('body').removeClass('fixed-navbar');
  });

  // Boxed layout
  $("[name='layout-style']").change(function () {
    if (+$(this).val()) $('body').addClass('boxed-layout');
    else $('body').removeClass('boxed-layout');
  });

  // THEMES CHANGE
  // ======================

  $('.color-skin-box input:radio').change(function () {
    var val = $(this).val();
    if (val != 'default') {
      if (!$('#theme-style').length) {
        $('head').append("<link href='assets/css/themes/" + val + ".css' rel='stylesheet' id='theme-style' >");
      } else $('#theme-style').attr('href', 'assets/css/themes/' + val + '.css');
    } else $('#theme-style').remove();
  });


  // BACK TO TOP
  $(window).scroll(function () {
    if ($(this).scrollTop() > APP.UI.scrollTop) $('.to-top').fadeIn();
    else $('.to-top').fadeOut();
  });
  $('.to-top').click(function (e) {
    $("html, body").animate({
      scrollTop: 0
    }, 500);
  });




  // Backdrop functional

  $.fn.backdrop = function () {
    $(this).toggleClass('shined');
    $('body').toggleClass('has-backdrop');
    return $(this);
  };

  $('.backdrop').click(closeShined);

  function closeShined() {
    $('body').removeClass('has-backdrop');
    $('.shined').removeClass('shined');
  }

});



//== VENDOR PLUGINS OPTIONS

$(function () {

  // Timepicker
  if ($.fn.timepicker) {
    $.fn.timepicker.defaults = $.extend(!0, {}, $.fn.timepicker.defaults, {
      icons: {
        up: "fa fa-angle-up",
        down: "fa fa-angle-down"
      }
    });
  }

});



// dashboard collection and expenses chart

var chart = AmCharts.makeChart("collection_chart", {
  "theme": "light",
  "type": "serial",
  "startDuration": 2,
  "dataProvider": [{
      "items": "Collections",
      "money": 10000,
      "color": "#4286f4"
    },
    {
      "items": "Fees",
      "money": 8000,
      "color": "#c12424"
    },
    {
      "items": "Expenses",
      "money": 5000,
      "color": "#6dc62d"
    }
  ],

  "legend": {
    "useGraphSettings": false,
    "position": "left",
    "marginBottom": 10,
    "spacing": 20,
    "verticalGap": 20,
    "data": [{
        title: "Collections $10,000",
        color: "#4286f4"
      }, {
        title: "Fees $8,000",
        color: "#c12424"
      },
      {
        title: "Expenses $5,000",
        color: "#6dc62d"
      }
    ]
  },

  "valueAxes": [{
    "position": "left",
    "axisAlpha": 0,
    "gridAlpha": .1
  }],

  "graphs": [{
    "balloonText": "[[category]]: <b>[[value]]</b>",
    "colorField": "color",
    "fillAlphas": 0.85,
    "lineAlpha": 0.1,
    "type": "column",
    "topRadius": 1,
    "valueField": "money"
  }],

  "depth3D": 40,
  "angle": 30,
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },

  "categoryField": "items",
  "categoryAxis": {
    "gridPosition": "start",
    "axisAlpha": 0,
    "gridAlpha": 0

  },

  "export": {
    "enabled": false
  }

}, 0);
