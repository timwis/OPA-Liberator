<?php
// Globals
$dbhandle = null;
$ajax = false;
$db['host'] = 'mysql.gocheckbook.com';
$db['user'] = 'opauser';
$db['pass'] = '######';
$db['name'] = 'opaliberator';
$input = isset($_GET['owner']) ? $_GET['owner'] : '';
$exact = isset($_GET['exact']) ? $_GET['exact'] : false;
$limit = isset($_GET['limit']) ? $_GET['limit'] : 0;
$callback = isset($_GET['callback']) ? $_GET['callback'] : '';
$geocoder_base_url = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";

require_once('functions.php');

// MAIN LOGIC
// If form was submitted
if($input) {
	header('Content-type: application/json');
	db_connect($db);

	// Prepare the input for the DB
	$input = sanitize_text($input);
	$input = strtoupper($input);

	if($exact)
		echo $callback ? $callback.'('.list_properties($input).')' : list_properties($input);
	else {
		$owners = search_owners($input, $limit);
		echo $callback ? $callback.'('.list_owners($owners).')' : list_owners($owners);
	}
}

else
	require_once('template.php');
?>