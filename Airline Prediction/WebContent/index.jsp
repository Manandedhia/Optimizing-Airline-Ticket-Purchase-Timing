<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link type="text/css" rel="stylesheet"  href="../static/css/custom.css">

<title>AirLine Prediction</title>
<!--datepicker -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>



<meta name="viewport" content="width=device-width, initial-scale=1.0">


<style>

.index_body {
    background: url(../static/images/airplanes.jpg) no-repeat center center fixed;
    -webkit-background-size: cover; /* For WebKit*/
    -moz-background-size: cover;    /* Mozilla*/
    -o-background-size: cover;      /* Opera*/
    background-size: cover;         /* Generic*/
    }


.top-homeblock {
    display: inline-block;
    position: absolute;
    top: 50px;
    width: 100%;
    height: 100%;
    text-align: center;
    font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif;
    background: rgba(255, 255, 255, 0.6)!important;
    -moz-box-shadow: rgba(255, 255, 255, 0.5) 0 0 0 1px inset, rgba(0, 0, 0, 0.35) 0 2px 5px 1px;
    -webkit-box-shadow: rgba(255, 255, 255, 0.5) 0 0 0 1px inset, rgba(0, 0, 0, 0.35) 0 2px 5px 1px;
    box-shadow: rgba(255, 255, 255, 0.5) 0 0 0 1px inset, rgba(0, 0, 0, 0.35) 0 2px 5px 1px;
}


.big-heading {
    font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 60px;
    line-height: 1;
    color: rgb(75, 75, 75);
    letter-spacing: -.02em;
    -webkit-font-smoothing: antialiased;
}
</style>


</head>
<body class="index_body">

<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
	<!-- Brand and toggle get grouped for better mobile display -->
	<div class="navbar-header">
	  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		<span class="sr-only">Toggle navigation</span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
	  </button>
	  <a href="/">
	  <table border="0" width="200" height="50"><tbody><tr><td align="center" valign="bottom">
    <div style="text-align:center;color:white" class="selected">Airline Flight Predictions</div>
</td>
</tr></tbody></table></a>
	</div>

	<!-- Collect the nav links, forms, and other content for toggling -->
	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	  <ul class="nav navbar-nav">
		<li class="active"><a href="/">Home <span class="sr-only">(current)</span></a></li>
		<li><a href="about">About</a></li>
	  </ul>
	  <ul class="nav navbar-nav navbar-right">
		<li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hi, Guest! <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="account.php">My Account</a></li>
            <li role="separator" class="divider"></li>
            <li><a style="cursor: hand;" data-toggle="modal" data-target=".bs-example-modal-sm">Sign in</a></li>
          </ul>
        </li>
	  </ul>
	</div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>


<div class="top-homeblock">


	<h1 align="center" class="big-heading">Search airfares, intelligently.</h1>
	<h1 class="sub-heading"><small>India's first airfare prediction engine.</small></h1><br><br>
	<div class="searchswap">
		<div class="searchbus"><!--searchbus started  -->
			<div class="row">
				<form action="searchData" method="POST">

					<div class="col-sm-3 form-group">
						<select class="form-control" id="from">
							<option value="BOM">Mumbai (BOM)</option>
							<option value="DEL">Delhi (DEL)</option>
							<option value="GOI">Goa (GOI)</option>
						</select>
						
					</div>
					<div class="col-sm-3 form-group">
						<select class="form-control" id="to">
							<option value="BOM">Mumbai (BOM)</option>
							<option value="DEL">Delhi (DEL)</option>
							<option value="GOI">Goa (GOI)</option>
						</select>
						
					</div>
					<div class="col-sm-3 form-group">
						<input type="date" id="travelDate"  class="form-control"/>
					</div>
					<div class="col-sm-3 form-group">
						<button type="button" class="btn btn-success" name="search" id="searchFlights">Search</button>
					</div>

				</form>
			</div>






		</div>
	</div>
	
	<div class="flightData"></div>
 </div>
 <div class="clearfix"></div>
 

 


<style>
.login-card {
	width: 300px;
	height: auto;
	padding: 25px 25px 25px 25px;
	display: inline-block;
	margin: auto;
	margin-top: 100px;
	text-align: left;
	font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif;
	background: rgba(255, 255, 255, 1)!important;
	-moz-border-radius: 8px;
	-webkit-border-radius: 8px;
	border-radius: 8px;
	-moz-box-shadow: rgba(255, 255, 255, 0.5) 0 0 0 1px inset, rgba(0, 0, 0, 0.35) 0 2px 5px 1px;
	-webkit-box-shadow: rgba(255, 255, 255, 0.5) 0 0 0 1px inset, rgba(0, 0, 0, 0.35) 0 2px 5px 1px;
	box-shadow: rgba(255, 255, 255, 0.5) 0 0 0 1px inset, rgba(0, 0, 0, 0.35) 0 2px 5px 1px;
}

.form-control {
	margin-top: 5px;
}


</style>



<script type="text/javascript">
	$(document).ready(function(){
		
		$("#searchFlights").click(function(){
			if($("#from").val()=="" || $("#to").val()== "" ||$("#travelDate").val()==""){
				alert("Please Insert data");
				return false;
			}else if($("#from").val() == $("#to").val()){
				alert("Source and Destination should be different");
				return false;
			}
			else{
			var from=$("#from").val();
			var to=$("#to").val();
			var travelDate=$("#travelDate").val();
			var btnClick=0;
			console.log(from);
			console.log(to);
			console.log(travelDate);
			
			
			
			$.ajax({
				url:"searchData",
				type:"POST",
				data:{'from':from,'to':to,'travelDate':travelDate},
				success:function(response){
					$.ajax({
						url:"fetchData",
						type:"POST",
						success:function(res){
							
							console.log(res);
							res=res.substring(30);
							$(".flightData").html(res);
						}
					});
				}
			});
			}
		});
		
		
	});
</script>

</body>
</html>
