<?php
    include('./ConexionBD.php');
	$conBD = new ConexionBD();

	$latitud = $_POST["latitud"];
	$longitud = $_POST["longitud"];
	
    try{
        $sql = "insert into horas (latitud, longitud) values ('$latitud', '$longitud')";
        
        $ret = mysqli_query($conBD -> conexion,$sql,MYSQLI_STORE_RESULT);
        if($ret == false)
        {
            echo "Error al guardar los datos";
        }
        else
        {
            echo "Datos guardados correctamente";
        }
        $conBD->conexion->close();
    }
    catch(Exception $ex)
    {
        echo $ex->getMessage();
    }
?>
