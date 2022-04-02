const beatMaker = new BeatMaker();

// Event Listeners

beatMaker.pads.forEach(pad => {
    pad.addEventListener('click', function(e) {
        beatMaker.activatePad(e);
    })
});

beatMaker.playBtn.addEventListener('click', function(e){
    beatMaker.playOrStop(e);
});

beatMaker.slider.addEventListener('input', function(e){
    beatMaker.changeTempoNumber(e);
});

beatMaker.slider.addEventListener('change', function(e){
    beatMaker.changeTempo(e);
});

beatMaker.audioSelects.forEach(select => {
    select.addEventListener('change', function(e){
        beatMaker.selectSound(e);
    });
});

beatMaker.muteBtns.forEach(muteBtn => {
    muteBtn.addEventListener('click', function(e) {
        beatMaker.muteOrUnmute(e);
    });
});