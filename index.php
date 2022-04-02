<?php
require './functions.php';
require 'config.php';

// Change tracks order and add new ones (or remove some) HERE
$tracks = ['snare', 'kick', 'tom', 'hihat', 'openhat', 'crash'];
setcookie('beatmaker_tracks', json_encode($tracks, JSON_UNESCAPED_UNICODE));
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?= APP_PATH ?>style.css">
    <!-- google fonts -->
    <link rel="stylesheet" href="<?= APP_PATH ?>lib/fonts/montserrat/montserrat.css">
    <!-- scripts -->
    <script defer src='<?= APP_PATH ?>src/BeatMaker.js'></script>
    <script defer src='<?= APP_PATH ?>app.js'></script>
    <title>Beatmaker</title>
</head>

<body>
    <header>
        <h1>BeatMaker</h1>
    </header>
    <div class="beatmaker-container">
        <div class="tracks-container-overflow">
            <div class="tracks-container">
                <?php foreach ($tracks as $percuName) : ?>
                    <div class="track">
                        <div class="track-title-container">
                            <h3 class="track-title"><?= ucfirst($percuName) ?></h3>
                        </div>
                        <div class="audio-select-container">
                            <select name="" class="audio-select <?= $percuName ?>">
                                <?php foreach (glob("sounds/" . $percuName . "/*.*") as $audioFile) : ?>
                                    <option value="<?= APP_PATH . $audioFile ?>"><?= getOptionName($audioFile, $percuName) ?></option>
                                <?php endforeach ?>
                            </select>
                        </div>
                        <div class="mute-btn-container">
                            <div class="mute-btn <?= $percuName ?>"><i class="fas fa-volume-up"></i></div>
                        </div>
                        <div class="pads-container">
                            <?php for ($p = 0; $p < 8; $p++) : ?>
                                <div class="pad <?= $percuName ?> p<?= $p ?>"></div>
                            <?php endfor ?>
                        </div>
                    </div>
                <?php endforeach ?>
            </div>
        </div>
        <div class="play-btn-container">
            <button class="play">
                <i class="fas fa-play"></i>
                <span class="btn-text">Play</span>
            </button>
        </div>
        <div class="slider-container">
            <input type="range" class="slider" min=50 max=350>
            <div>
                <span>Tempo: </span>
                <span class="tempo-nr"></span>
            </div>
        </div>
    </div>
    <?php foreach ($tracks as $percuName) : ?>
        <audio class="beat <?= $percuName ?>" src="<?= APP_PATH ?>sounds/<?= $percuName ?>/<?= $percuName ?>-0.wav" preload></audio>
    <?php endforeach ?>

    <!-- font awesome -->
    <link rel="stylesheet" href="<?= APP_PATH ?>lib/fonts/font-awesome/all.css">

</body>

</html>