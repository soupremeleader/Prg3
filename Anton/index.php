<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/stylesheet.css">
    <title>Notificatie</title>
</head>

<body>

<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM trains";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "<button class='trainBtn' data-name='" . $row["name"] . "'>" . $row["name"]. "</button>";
    }
} else {
    echo "0 results";
}

mysqli_close($conn);
?>

<div id="myModal" class="modal">
    <div class="modal-content">
        <div class="card">
            <span class="close">&times;</span>
            <div class="image-container">
                <img src="https://cdn-icons-png.flaticon.com/512/3/3843.png" alt="Popup Image">
            </div>
            <p id="trainInfo"></p>
        </div>
    </div>
</div>

<script>
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    let trainInfo = document.getElementById("trainInfo");
    let trainBtns = document.getElementsByClassName("trainBtn");

    function fetchTrainData() {
        <?php
        $servername = "localhost";
        $username = "your_username";
        $password = "your_password";
        $dbname = "your_database_name";

        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);

        // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        $sql = "SELECT * FROM trains WHERE delay > 0";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            $row = mysqli_fetch_assoc($result);
            echo "trainInfo.innerHTML = 'De " . $row["name"] . " +" . $row["delay"] . " min vertraging';";
            echo "modal.style.display = 'block';";
        } else {
            echo "trainInfo.innerHTML = '';";
            echo "modal.style.display = 'none';";
        }

        mysqli_close($conn);
        ?>
    }

    // Fetch train data initially and then every 10 seconds
    fetchTrainData();
    setInterval(fetchTrainData, 10000);

    for (let i = 0; i < trainBtns.length; i++) {
        trainBtns[i].addEventListener('click', function() {
            let trainName = this.getAttribute('data-name');
        }
    }
<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create connection
$conn = mysqli_connect($servername, $username, $password);
?>