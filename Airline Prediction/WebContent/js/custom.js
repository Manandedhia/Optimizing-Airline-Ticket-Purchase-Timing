function form_validations() {
  if (document.getElementById("from-pick").value == '') {
    textbox_validation()
    showalert('foralert','From city cannot be blank','danger');
  } else if (document.getElementById("to-pick").value == '') {
    textbox_validation()
    showalert('foralert','To city cannot be blank','danger');
  } else if (document.getElementById("to-pick").value == document.getElementById("from-pick").value) {
    textbox_validation()
    showalert('foralert','From city and To city cannot be the same','danger');
  } //else if (!(($.inArray(document.getElementById("from-pick").value, tier1) != -1) || $.inArray(document.getElementById("to-pick").value, tier1) != -1)) {
    //textbox_validation()
    //showalert('foralert','This route is currently unavailable','danger');
  //}
    else if ($.inArray(document.getElementById("to-pick").value, airports) == -1) {
    textbox_validation()
    showalert('foralert','To city not valid','danger');
  } else if ($.inArray(document.getElementById("from-pick").value, airports) == -1) {
    textbox_validation()
    showalert('foralert','From city not valid','danger');
  } else {
    window.from_city = document.getElementById("from-pick").value.slice(-4).slice(0,3);
    $('input[name="from"]').val(from_city);
    window.to_city = document.getElementById("to-pick").value.slice(-4).slice(0,3);
    $('input[name="to"]').val(to_city);
    window.round = $("input[name='option']:checked").val();
    $('input[name="round"]').val(round);
    
    $('input[id="month_start"]').val(moment().format("YYYY-MM-01"));
	get_header();
    get_body();
    $("#arrow-left").hide();
    
    $('div[id="calendar_modal"]').modal('show');
    process_json();
  }
  
}

function textbox_validation(){
	
  if ((document.getElementById("to-pick").value == document.getElementById("from-pick").value) || (document.getElementById("to-pick").value == '') || $.inArray(document.getElementById("to-pick").value, airports) == -1) {
    
    $('input[id="to-pick"]').css({ "border-color": '#FF0000' , "box-shadow": '0 0 5px rgba(207, 0, 0, 0.4)'});
    
  } else {
    $('input[id="to-pick"]').css({ "border-color": '#ccc' , "box-shadow": 'inset 0 1px 1px rgba(0, 0, 0, .075)'});
  };
  
  if ((document.getElementById("to-pick").value == document.getElementById("from-pick").value) || (document.getElementById("from-pick").value == '') || $.inArray(document.getElementById("from-pick").value, airports) == -1) {
    
    $('input[id="from-pick"]').css({ "border-color": '#FF0000' , "box-shadow": '0 0 5px rgba(207, 0, 0, 0.4)'});
    
  } else {
    $('input[id="from-pick"]').css({ "border-color": '#ccc' , "box-shadow": 'inset 0 1px 1px rgba(0, 0, 0, .075)'});
  };
  
}

function showalert(id,message,alerttype) {
    $('#'+id).append('<div id="alertdiv" class="alert alert-' + alerttype + '"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning! </strong> '+message+'</div>')
    setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
      $("#alertdiv").remove();
    }, 5000);
  }

function submit_myform() {
    if ((round == 2) && ($("#ret").val() == '')) {
        showalert('calerror','Select the return flight date','danger');
    } else {
        $('#submit_data').submit();
    }
}

function submit_booking() {
  showalert('book_error','We are currently in Beta. Booking functionality is not added yet.','warning');
}

function isTouchDevice(){
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}

      


function process_json() {
        
        $.ajax({
                url: "api/fare-calendar.php?from=" + from_city + "&to=" + to_city +"&round=" + round +"&cd=7",
                dataType: 'json',
                async: false,
                success: function(data) {
                  var result_string = JSON.stringify(data);
                      window.fares = JSON.parse(result_string);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  showalert('calerror','Unable to load fares','danger');
                }
        });
        
        
        
        var max_price = Math.max.apply(Math,fares['result']['onward'].map(function(o){return o.pr;}));
        window.min_price = Math.min.apply(Math,fares['result']['onward'].map(function(o){return o.pr;}));
        if (round == 2) {
            var max_price_ret = Math.max.apply(Math,fares['result']['return'].map(function(o){return o.pr;}));
            window.min_price_ret = Math.min.apply(Math,fares['result']['return'].map(function(o){return o.pr;}));
            window.range1_ret = min_price_ret + Math.round((max_price_ret - min_price_ret)/3);
            window.range2_ret = min_price_ret + Math.round(2*((max_price_ret - min_price_ret)/3));
        }
        
        window.range1 = min_price + Math.round((max_price - min_price)/3);
        window.range2 = min_price + Math.round(2*((max_price - min_price)/3));
        
        color_code(0);
    }
    
    function color_code(init_price) {
        // color code the dates with prices
        if (init_price != 0) {
            //this is return fares
            
            $('#low').text('Rs ' + (min_price_ret + init_price) + '+');
            $('#medium').text('Rs ' + (range1_ret + init_price) + '+');
            $('#high').text('Rs ' + (range2_ret + init_price) + '+');
            
            for (dt_count = 1; dt_count <= 90; dt_count++) {
                var bt_id = moment().add(dt_count,'days').format("YYYY-MM-DD");
                var price = (parseFloat(fares['result']['return'][(dt_count-1)]['pr']) + init_price);
                $("#pr"+bt_id).text("Rs " + price);
                $("#"+bt_id).attr('title', 'Return fare: '+(price));
                if (price < (range1_ret + init_price)) {
                    $("#hr"+bt_id).removeClass().addClass('green-line');
                } else if (price < (range2_ret + init_price)) {
                    $("#hr"+bt_id).removeClass().addClass('orange-line');
                } else {
                    $("#hr"+bt_id).removeClass().addClass('red-line');
                }
            }
        } else {
            //this is onward fares
            $('#low').text('Rs ' + (min_price + init_price) + '+');
            $('#medium').text('Rs ' + (range1 + init_price) + '+');
            $('#high').text('Rs ' + (range2 + init_price) + '+');
            
            for (dt_count = 1; dt_count <= 90; dt_count++) {
                var bt_id = moment().add(dt_count,'days').format("YYYY-MM-DD");
                var price = fares['result']['onward'][(dt_count-1)]['pr'];
                $("#pr"+bt_id).text("Rs " + price);
                $("#"+bt_id).attr('title', 'Onward fare: '+(price));
                if (price < range1) {
                    $("#hr"+bt_id).removeClass().addClass('green-line');
                } else if (price < range2) {
                    $("#hr"+bt_id).removeClass().addClass('orange-line');
                } else {
                    $("#hr"+bt_id).removeClass().addClass('red-line');
                }
            }
        }
        
        // remove tooltips is touch device
        if(isTouchDevice()===false) {
          $('[data-toggle="tooltip"]').tooltip('fixTitle');
        }
    }
    
    $('#calendar_modal').on('shown.bs.modal', function (e) {
      $("#dep").val('');
      $("#ret").val('');
    })
    
    function select_date(clicked) {
        var a = moment(moment(),'YYYY-MM-DD');
        var b = moment(clicked,'YYYY-MM-DD');
        var diffDays = b.diff(a, 'days');
        // if this is a first click 
        if ($("#dep").val() == '') {
            $("#dep").val(clicked);
            $("#which-date").text('return');
            var onward_price = parseFloat(fares['result']['onward'][(diffDays-1)]['pr']);
            
            if (round == 2) {
                color_code(onward_price);
                $("#"+clicked).removeClass().addClass('btn btn-primary day start-date');
            } else {
                color_code(0);
                $("#"+clicked).removeClass().addClass('btn btn-primary day');
                $("#calendar_modal").modal('hide');
                submit_myform();
            }
            
            
        // if this is a click for the return date
        } else if ($("#ret").val() == '' && round == 2) {
            $("#ret").val(clicked);
            
            // if dep is greater than ret date
            if ($("#dep").val() > $("#ret").val()) {
                $("#"+$("#dep").val()).removeClass().addClass('btn btn-default day');
                $("#which-date").text('onward');
                $("#dep").val(clicked);
                $("#ret").val('');
                var onward_price = parseFloat(fares['result']['onward'][(diffDays-1)]['pr']);
                color_code(onward_price);
                if (round == 2) {
                    $("#"+clicked).removeClass().addClass('btn btn-primary day start-date');
                } else {
                    $("#"+clicked).removeClass().addClass('btn btn-primary day');
                }
            } else {
                //color_code(0);
                $("#"+$("#dep").val()).removeClass().addClass('btn btn-primary day start-date');
                $("#"+clicked).removeClass().addClass('btn btn-primary day end-date');
                $("#calendar_modal").modal('hide');
                submit_myform();
            }
            
        } 
        
    }
    
    function get_header() {
        var header = '';
      
        header += '<table border=0 width=100%>';
        header += '<tr> \
                    <td colspan=3 align="center" style="color:#B8860B;">Select <b id="which-date">onward</b> date <hr style="margin:5px 0px 0px 0px;"> \
                    </td> \
                  </tr>';
        header += '<tr><td align="left" width=60>';
        header += '<button id="arrow-left" onClick="arrow_click(this.id)" type="button" class="btn btn-default arrow-left"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' + moment($('input[id="month_start"]').val()).subtract(1, 'months').format("MMM") + '</button></td>';
        header += '<td align="center"><h4 class="modal-title" id="center-month">' + moment($('input[id="month_start"]').val()).format("MMMM &#39;YY") + '</h4></td>';
        header += '<td align="right" width=60>';
        header += '<button id="arrow-right" onClick="arrow_click(this.id)" type="button" class="btn btn-default arrow-right">' + moment($('input[id="month_start"]').val()).add(1, 'months').format("MMM") + '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button></td>';
        
        header += '</tr>';
        
        
        header += '</table>';
        
        $('#cal-header').html(header);
    }
    
    function get_body() {
        var body = '';
        body += '<table border=0 height=100% align="center" >';
        var month_start_day = moment($('input[id="month_start"]').val()).format("d");
        var month_end_day = moment($('input[id="month_start"]').val()).endOf("month").format("D");
        
        for (var row = 1; row <= 6; row++) {
            body += '<tr>';
            for (var col = 1; col <= 7; col++) {
                var today_date = (((row-1)*7 + col) - month_start_day);
                var today_full = moment($('input[id="month_start"]').val()).add((today_date - 1),"days").format("YYYY-MM-DD");
                
                body += '<td width=37>';
                
                if ((today_full <= moment().format("YYYY-MM-DD")) || (today_full > moment().add(90,"days").format("YYYY-MM-DD"))) {
                    var disabled = ' disabled="disabled" ';
                } else {
                    var disabled = '';
                }
                
                if ((col > month_start_day) || (row != 1)) {
                    if (month_end_day >= today_date) {
                        body += '<button type="button" data-toggle="tooltip" data-placement="top" onClick="select_date(this.id)" id="' + today_full + '" class="btn btn-default day" ' + disabled + '><p class="date-text">' + today_date + '</p><hr id="hr' + today_full + '"  class="silver-line" /></button>';
                    }
                }
            
                body += '</td>';
                
            }
        }
        
        body += '</tr>';

        body += '</table>';
        $('#cal-content').html('');
        $('#cal-content').html(body);
    }
    
    function arrow_click(id) {
        if (id == "arrow-left") {
            $('input[id="month_start"]').val(moment($('input[id="month_start"]').val()).subtract(1, 'months').format("YYYY-MM-01"));
            $('#cal-header').html('');
            get_header();
            $('#cal-content').html('');
            get_body();
        } else {
            $('input[id="month_start"]').val(moment($('input[id="month_start"]').val()).add(1, 'months').format("YYYY-MM-01"));
            $('#cal-header').html('');
            get_header();
            $('#cal-content').html('');
            get_body();
        }
        
        if ($('input[id="month_start"]').val() == moment().format("YYYY-MM-01")) {
            $("#arrow-left").hide();
        } else if ($('input[id="month_start"]').val() == moment().add(90, 'days').format("YYYY-MM-01")) {
            $("#arrow-right").hide();
        } else {
            $("#arrow-left").show();
            $("#arrow-right").show();
        }
        
            color_code(0);
            
            $("#"+$("#dep").val()).removeClass().addClass('btn btn-primary day start-date');
    }
    
    function return_change(id) {
        if (id == "option1") {
          $('button[id="date-range"]').html('<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> ' + moment().add(1,"days").format("DD MMMM YYYY"));
        } else {
          $('button[id="date-range"]').html('<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> ' + moment().add(1,"days").format("DD MMMM YYYY") + ' - ' + moment().add(4,"days").format("DD MMMM YYYY"));
        }
    }
    
function get_city() {
  $.ajax({
          url: "api/city.php",
          dataType: 'text',
          async: false,
          success: function(data) {
            window.client_airport = data;
          },
          error: function(jqXHR, textStatus, errorThrown) {
            showalert('foralert','Unable to find your closest airport','danger');
          }
  });
  
    
  $('input[id="from-pick"]').val(client_airport);
}


function subscribe(user_email, source) {
	var sub_details = 'email='+ user_email + '&source=' + source;
    $('#Exitmodal').modal('hide')
	if (user_email == '') {
        alert( 'Enter email ID' );
    } else {
	  $.ajax({
          type: "POST",
		  url: "api/subscribe.php",
          data: sub_details,
		  cache: false,
          async: true,
          success: function(result) {
             if (result == 'Success') {
                $('#myModalheader').text('Thank you!');
				$('#myModalbody').text('Thank you for subscribing to Unfare. You will receive an email from us shortly.');
                ga('send', 'event', { eventCategory: 'Subscribe', eventAction: 'EmailAdded'});
             } else {
				$('#myModalheader').text('Email exists');
				$('#myModalbody').text('It looks like we have that email with us already.');
                var popup_init = 0;
			 }
			 
          },
          error: function(jqXHR, textStatus, errorThrown) {
            NULL;
          }
	  });
	  
	  
	}
    
    $('#myModal').modal('show')
  }
    