<?php
$about = isset($_GET['about']) ? true : false;
function printfile($filename) {
	$fp = fopen($filename, 'r');
	while(!feof($fp))
		echo fgets($fp, 4096);
}
?>
<!DOCTYPE html> 
<html> 
<head> 

<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>

<title>Philly Property Owner Search</title>

 <link  href="http://fonts.googleapis.com/css?family=Allerta+Stencil:regular:regular" rel="stylesheet" type="text/css" > 
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="http://www.blueprintcss.org/blueprint/screen.css" type="text/css" media="screen, projection"> 
    <link rel="stylesheet" href="stylesheets/style.css">
   
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"  type="text/javascript" charset="utf-8"></script> 
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js" type="text/javascript" charset="utf-8"></script> 
    <script src="js/classes.js"></script>
    <script src="js/pubsub.js"></script>
    <script src="js/errors.js"></script>
    <script src="js/ListManager.js"></script>
    <script src="js/main.js"></script>
    <script src="js/maps.js"></script>

    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script> 
<script type="text/javascript">

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-24065525-1']);
_gaq.push(['_setDomainName', '.phillyaddress.com']);
_gaq.push(['_trackPageview']);

(function() {
 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();

</script>
</head> 
<body>
  <br />
    <div class="container">
      <div id="header" class="span-24">
	   <h1>Philly Property Owner Search</h1>
      </div>
      <div class="span-24"><br /></div>
<?php if($about): ?>
	   <div id="about">
<?php printfile('README'); ?>
	   </div>
<?php else: ?>
      <div class="prepend-1 span-5 append-1">
	   <div class="errors"></div>
	   <div>Start typing an owner name:</div>
	   <div>
	     <input id="owner"><img src="assets/loader.gif" class="loader">
	   </div>
	   <div>Properties:</div>
	   <div>
	     <select size="2" id="properties"></select>
	   </div>
	   <div id="nav"><a href="?about">About</a>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;<a href="mailto:tim@timwis.com">Contact</a></div>
      </div>
      <div id="canvas_holder" class="span-16 append-1 last">
	   <div id="map_canvas"></div>
      </div>
<?php endif; ?>
    </div>
  </body>
</html> 

