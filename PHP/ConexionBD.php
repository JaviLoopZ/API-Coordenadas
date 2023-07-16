<?php
    class ConexionBD
    {
        public $conexion;
        public function __construct()
        {
            $this->conexion = mysqli_connect("localhost", "root", "*mm060221", "registro");
            mysqli_select_db($this->conexion,"registro");
        }
    }

?>