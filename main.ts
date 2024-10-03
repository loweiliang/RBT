let servo_angle = 90
// Set initial servo position
pins.servoWritePin(AnalogPin.P1, servo_angle)
basic.forever(function () {
    // Close mouth when light is detected (environment light sensor)
    if (input.lightLevel() > 128) {
        servo_angle = 0
        pins.servoWritePin(AnalogPin.P1, servo_angle)
    } else {
        servo_angle = 90
        pins.servoWritePin(AnalogPin.P1, servo_angle)
    }
    // Shake head when light is detected (light sensor connected to P3)
    if (pins.analogReadPin(AnalogReadWritePin.P3) > 512) {
        // Shake head left
        pins.servoWritePin(AnalogPin.P1, 30)
        basic.pause(200)
        // Shake head right
        pins.servoWritePin(AnalogPin.P1, 150)
        basic.pause(200)
        // Return to initial position
        pins.servoWritePin(AnalogPin.P1, 90)
    }
    // Simulate battery charging (solar panel connected to P4)
    if (pins.analogReadPin(AnalogReadWritePin.P4) > 512) {
        // Simulate charging
        pins.digitalWritePin(DigitalPin.P5, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P5, 0)
    }
    // Swing tail when pressure sensor is pressed (connected to P2)
    if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        // Tail swings left
        pins.servoWritePin(AnalogPin.P1, 45)
        basic.pause(200)
        // Tail swings right
        pins.servoWritePin(AnalogPin.P1, 135)
        basic.pause(200)
        // Return to initial position
        pins.servoWritePin(AnalogPin.P1, 90)
    }
    // Button A plays melody
    if (input.buttonIsPressed(Button.A)) {
        music.playMelody("C D E F G A B C5 ", 120)
    }
    // Button B makes the dragon's eyes flash
    if (input.buttonIsPressed(Button.B)) {
        for (let index = 0; index < 5; index++) {
            // Eyes on
            pins.digitalWritePin(DigitalPin.P0, 1)
            basic.pause(100)
            // Eyes off
            pins.digitalWritePin(DigitalPin.P0, 0)
            basic.pause(100)
        }
    }
})
