import { Injectable } from '@angular/core';


declare function require(name:string);
var navigator = require('jzz');

var midi:any;

@Injectable()
export class MidiService {
    navigator = navigator;

    constructor() {

    }

    onMidiInit() {
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({
                sysex: false
            }).then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
        } else {
            alert("No MIDI support in your browser.");
        }
    }

    onMIDISuccess(midiAccess) {
        console.log('MIDI Access Object', midiAccess);
        midi = midiAccess;
        console.log(midi);

        var inputs = midi.inputs.values();
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = this.onMIDIMessage.bind(this);
        }

    }

    onMIDIMessage(event) {
        console.log("msg received", event);
    }

    onMIDIFailure(e) {
        console.log(e);
    }
}