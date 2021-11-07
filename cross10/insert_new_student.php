<?php

if(isset($_SERVER['HTTP_ORIGIN'])){
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response

$response = array();

// check for required fields
if ( isset($_POST['nim']) && isset($_POST['nama']) && isset($_POST['prodi']) && isset($_FILES['foto'])){
  $nim = $_POST['nim'];
  $nama = $_POST['nama'];
  $prodi = $_POST['prodi'];
  $foto = $_FILES['foto'];

  require_once __DIR__ . '/dbconfig.php';

  /// conect to db
  $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

  //save uploaded image
  $source = $foto['tmp_name'];
  $destination = 'uploads/' . $foto['name'];
  move_uploaded_file($source, $destination);

  //mysql inserting a new row
  $result = mysqli_query($db, "INSERT INTO students(nim, nama, prodi, foto) VALUES('$nim', '$nama','$prodi','$destination')");


  //cehck if row inserted or not
  if($result){
    //succes
    $response["success"] = 1;
    $response["message"] = "Data mahasiswa berhasil dimasukkan";
  } else {
    //fail
    $response["success"] = 0;
    $response["message"] = "Ada Kesalahan";

  }
  // echoing JSON response
  echo json_encode($response);
} else {
  // requires field is missing
  $response["success"] = 0;
  $response["message"] = "Data tidak Lengkap";


  //echoing JSON Response
  echo json_encode($response);
}



