<?php
if (isset($_SERVER['HTTP_ORIGIN'])){
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

$response = array();

// include db connect class

require_once __DIR__ . '/dbconfig.php';

//connect to db

$db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());


$result = mysqli_query($db, "SELECT * FROM students") or
die(mysqli_connect_error());

//check for empty result

if(mysqli_num_rows($result)> 0){
  //looping through all result
  $response["students"] = array();

  while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    //temp mahasiswa array
    $mahasiswa = array();
    $mahasiswa["nim"]= $row["nim"];
    $mahasiswa["nama"]= $row["nama"];
    $mahasiswa["prodi"]= $row["prodi"];
    $mahasiswa["foto"]= $row["foto"];
    array_push($response["students"], $mahasiswa);
  }
$response["success"] = 1;
echo json_encode($response);
} else {
  $response["students"] = 0;
  $response["message"] = "Tidak ada Mahasiswa yang ditemukan";
  echo json_encode($response);
}
mysqli_free_result($result);
?>
