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










// $(document).on('click', '#close-preview', function () {
//   $('.image-preview').popover('hide');
//   // Hover befor close the preview
//   $('.image-preview').hover(
//     function () {
//       $('.image-preview').popover('hide');
//     },
//     function () {
//       $('.image-preview').popover('hide');
//     }
//   );
// });


// $(function () {
  // Create the close button
  // var closebtn = $('<button/>', {
  //   type: "button",
  //   text: 'x',
  //   id: 'close-preview',
  //   style: 'font-size: initial;',
  // });


  // closebtn.attr("class", "close pull-right");
  // Set the popover default content
  // $('.image-preview').popover({
  //   trigger: 'manual',
  //   html: true,
  //   title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
  //   content: "There's no image",
  //   placement: 'bottom'
  // });


  // Clear event
  // $('.image-preview-clear').click(function () {
  //   $('.image-preview').attr("data-content", "").popover('hide');
  //   $('.image-preview-filename').val("");
  //   $('.image-preview-clear').hide();
  //   $('.image-preview-input input:file').val("");
  //   $(".image-preview-input-title").text("Browse");
  // });


  // Create the preview image
  // $(".image-preview-input input:file").change(function () {
    // var img = $('<img/>', {
    //   id: 'dynamic',
    //   width: 250,
    //   height: 200
    // });
    // var file = this.files[0];
    // var reader = new FileReader();
    // Set preview image into the popover data-content
    // reader.onload = function (e) {
      // $(".image-preview-input-title").text("Change");
      // $(".image-preview-clear").show();
      // $(".image-preview-filename").val(file.name);
      // img.attr('src', e.target.result);
      // $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("hide");
    // }
    // reader.readAsDataURL(file);
  // });
// });




$('#searchMenu').on('keyup', function(){

  console.log('search value : ', this.value);

  if(this.value == "" || this.value == null){
    let allLi = $('#allMenuItems').children();
    let liElem = Array.from(allLi);

    liElem.forEach((el)=>{
      $(el).removeClass('active');
      $(el).children('ul').removeClass('in');
      $(el).children('a').children('span').removeClass('text-warning font-weight-bold');
    });

    return;
  }

  menuArr = [
    "enrollment",
    "student admission",
    "bulk upload",
    "registration",
    "enquery",
    "fee management",
    "student management",
    "update student",
    "view student",
    "roll no assign",
    "attandance report",
    "view time table",
    "teacher activities",
    "examination management",
    "user managements",
    "notifications & events",
    "transport management",
    "finance management",
    "leave management",
    "certificates management"
  ];

  for (let index = 0; index < menuArr.length; index++) {
    var matchFound = menuArr[index].match(this.value);

    if (matchFound != null) {
      var matchItem = matchFound.input.replace(" ", "-");
      break;
    }
  }

  console.log(matchItem);
  selectMenuItemFromSideMenu(matchItem);
});




function selectMenuItemFromSideMenu(id) {
    console.log('calling function : ', id);      

    if($(`#${id}`).attr('data-hasSub') == "true"){
      console.log('match');
      // console.log($(`#${id}`).parent().children());
      let elemArr = Array.from($(`#${id}`).parent().children());
      // console.log(elemArr);
      
      elemArr.forEach((el)=>{
        // console.log($(el).hasClass('active')); 
        if($(el).hasClass('active')){            
          $(el).removeClass('active');
          $(el).children('ul').removeClass('in');
          $(el).children('a').children('span').removeClass('text-warning font-weight-bold');
        } 
      });


      $(`#${id}`).addClass('active');
      $(`#${id} ul`).addClass('in');
      $(`#${id} a span`).addClass('text-warning font-weight-bold');
    }






    if($(`#${id}`).attr('data-hasSub') == "sub"){
      console.log('match sub');
      
      let elemArr = Array.from($(`#${id}`).parent().parent().parent().children());

      elemArr.forEach((el)=>{
        if($(el).hasClass('active')){
          $(el).removeClass('active');
          $(el).children('ul').removeClass('in');
          // $(`#${id} a span`).removeClass('text-warning font-weight-bold');
          $(el).children('a').children('span').removeClass('text-warning font-weight-bold');

          $(`#${id}`).parent().parent().removeClass('active');
          $(`#${id}`).parent().parent().children('ul').removeClass('in');        
          $(`#${id}`).children('a').removeClass('text-warning font-weight-bold');
        }          
      });

      $(`#${id}`).parent().parent().addClass('active');
      $(`#${id}`).parent().parent().children('ul').addClass('in');        
      $(`#${id}`).children('a').addClass('text-warning font-weight-bold');
    }
  
}
