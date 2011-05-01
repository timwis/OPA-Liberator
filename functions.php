<?php
function db_connect($db)
{
	$dbhandle = mysql_connect($db['host'], $db['user'], $db['pass']) or die(mysql_error());
	if(!mysql_select_db($db['name'], $dbhandle))
		die('Database Connection Error');
}

// TODO: Sanitize enough for MySQL
// TODO: Min string length (avoid searching for 'a' etc.)
function sanitize_text($input) {
	return mysql_real_escape_string(trim($input));
}

function generate_tencode($street_code, $house_number, $suffix = '', $unit = '')
{
	$street_code = str_pad($street_code, 5, '0', STR_PAD_RIGHT);
	$house_number = str_pad($house_number, 5, '0', STR_PAD_LEFT);

	$return = $street_code.$house_number;
	if($suffix)
		$return .= $suffix;
	if($unit && $unit > 0) {
		$unit = str_pad($unit, 7, '0', STR_PAD_LEFT);
		$return .= $unit;
	}
	return $return;
}

function get_lat_lon($address) {
    global $geocoder_base_url;
    $res = file_get_contents($geocoder_base_url . urlencode($address));
    $json = json_decode($res);

    # http://code.google.com/apis/maps/documentation/geocoding/index.html#JSON
    if (strcmp($json->{"status"}, "OK") == 0) {
        return $json->{"results"}[0]->{"geometry"}->{"location"};
    } else {
        return null;
    }
}

function save_lat_lon($parcel_number, $lat, $lon) {
	$sql = "UPDATE `properties`
			SET `lat` = $lat, `lon` = $lon
			WHERE `parcel_number` = $parcel_number
			LIMIT 1";
	return mysql_query($sql);
}

// Search for owners by name
function search_owners($input) {
	$return = array();

	$sql = "SELECT `OwnerName`, COUNT(*)
			FROM `properties`
			WHERE `OwnerName` LIKE '%$input%'
			GROUP BY `OwnerName`";
	$query = mysql_query($sql);

	if(mysql_num_rows($query)) {
		while ($row = mysql_fetch_assoc($query)) {
			$return []= $row; // TODO: Is it possible to skip this loop and just fetch a proper array?
		}
	}
	return $return;
}

// Just a hiding place for the loop
function list_owners($owners) {
	$return = array();

	foreach($owners as $owner) {
		$return []= array(
			'owner' => $owner['OwnerName'],
			'count' => $owner['COUNT(*)'],
		);
		/*echo '
	<li><a href="?owner='.$owner['OwnerName'].'&exact=true">'.$owner['OwnerName'].' ('.$owner['COUNT(*)'].')</a></li>';*/
	}
	if(!empty($return))
		return json_encode($return);
}

// TODO: Add ORDER BY once we get the field names
function list_properties($owner) {
	global $db, $dbhandle;
	$return = array();

	$sql = "SELECT *
			FROM `properties`
			WHERE `OwnerName` = '$owner'";
	$query = mysql_query($sql);

	if(mysql_num_rows($query)) {
		/*echo '
<ul>';*/
		while ($row = mysql_fetch_assoc($query)) {
			$tencode = generate_tencode($row['street_code'], $row['house_number'], $row['suffix'], $row['unit']);
			if($row['lat'] && $row['lon']) {
				$lat = $row['lat'];
				$lon = $row['lon'];
			}
			else if($lat_lon = get_lat_lon($row['PropertyAddress'].', Philadelphia, PA '.$row['PropertyZipCode'])) {
				$lat = $lat_lon->{"lat"};
				$lon = $lat_lon->{"lng"}; // inconsistent
				save_lat_lon($row['parcel_number'], $lat, $lon);
			}

			$return []= array(
				'address' => $row['PropertyAddress'],
				'tencode' => $tencode,
				'lat' => $lat,
				'lon' => $lon,
			);

			/*echo '
	<li><a href="http://opa.phila.gov/opa.apps/Search/SearchResults.aspx?id='.$tencode.'" target="_blank">'.$row['PropertyAddress'].'</a></li>';*/
		}
		/*echo '
</ul>';*/
	}
	if(!empty($return))
		return json_encode($return);
}

?>