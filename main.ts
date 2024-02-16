function zeige_Ordner () {
    modules.groveLCD.setLine(1, "Ordner " + Ordner)
}
// Auswahl Ordner
mpr121.onTouchSensorTouched(TouchSensor.T8, function () {
    if (status == 3) {
        serialmp3.runMp3Command(Mp3Command.PLAY_PREVIOUS_TRACK)
    } else {
        status = 1
        Ordner = serialmp3.mp3Folder()
        zeige_Ordner()
        basic.setLedColors(0x000000, 0x000000, 0xff0000)
    }
})
// Auswahl Titel
mpr121.onTouchSensorTouched(TouchSensor.T3, function () {
    if (status == 3) {
        serialmp3.runMp3Command(Mp3Command.PLAY_NEXT_TRACK)
    } else {
        status = 2
        Titel = serialmp3.mp3Track()
        zeige_Titel()
        basic.setLedColors(0x00ff00, 0x000000, 0x000000)
    }
})
// Blau: Auswahl Titel / Ordner
// Gelb: Abspielen
mpr121.onTouchSensorTouched(TouchSensor.T2, function () {
    if (status == 1) {
        serialmp3.playMp3Folder(Ordner, Mp3Repeat.No)
    } else if (status == 2) {
        serialmp3.playMp3TrackFromFolder(Titel, Ordner, Mp3Repeat.No)
    } else if (status == 3) {
        serialmp3.runMp3Command(Mp3Command.STOP)
        status = 2
        Titel = serialmp3.mp3Track()
        zeige_Titel()
        basic.setLedColors(0x000000, 0x0000ff, 0x000000)
    }
})
serialmp3.onMp3TrackCompleted(function () {
    basic.turnRgbLedOff()
})
function zeige_Titel () {
    modules.groveLCD.setLine(0, "Titel: " + Titel)
}
// Pausetaste
mpr121.onTouchSensorTouched(TouchSensor.T10, function () {
    if (status == 3) {
        pause2 = true
        serialmp3.runMp3Command(Mp3Command.PAUSE)
    }
})
// Pause beenden
mpr121.onTouchSensorTouched(TouchSensor.T9, function () {
    if (pause2) {
        pause2 = false
        if (status == 3) {
            serialmp3.runMp3Command(Mp3Command.RESUME)
        }
    }
})
mpr121.onTouchSensorTouched(TouchSensor.T1, function () {
    if (status == 1 && Ordner < 10) {
        Ordner += 1
        zeige_Ordner()
    } else if (status == 2 && Titel < 10) {
        Titel += 1
        zeige_Titel()
    } else if (status == 3) {
        serialmp3.runMp3Command(Mp3Command.INCREASE_VOLUME)
        basic.showNumber(serialmp3.mp3Volume())
        zeige_Titel()
    }
})
serialmp3.onMp3TrackStarted(function () {
    status = 3
    Titel = serialmp3.mp3Track()
    zeige_Titel()
    basic.setLedColors(0x000000, 0xffff00, 0x000000)
})
// Wenn blau: Ordner/Titel wählen
// Wenn gelb: Modus play, Lautstärke  kann verändert werden.
// Anzeige am Bildschirm
// 
mpr121.onTouchSensorTouched(TouchSensor.T0, function () {
    if (status == 1 && Ordner > 1) {
        Ordner += -1
        zeige_Ordner()
    } else if (status == 2 && Titel > 0) {
        Titel += -1
        zeige_Titel()
    } else if (status == 3) {
        serialmp3.runMp3Command(Mp3Command.DECREASE_VOLUME)
        basic.showNumber(serialmp3.mp3Volume())
        zeige_Titel()
    }
})
let pause2 = false
let status = 0
let Ordner = 0
let Titel = 0
modules.groveLCD.setBrightness(100)
modules.groveLCD.setLine(0, "Titel: " + Titel)
modules.groveLCD.setLine(1, "Ordner " + Ordner)
serialmp3.connectSerialMp3(DigitalPin.C17, DigitalPin.C16)
status = 0
pause2 = false
basic.showIcon(IconNames.EighthNote)
