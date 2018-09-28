import { Injectable } from '@angular/core';
import { Events, Platform } from 'ionic-angular';


declare function require(name:string);
var navigator = require('jzz');

declare var cordova;

var midi:any;

@Injectable()
export class MidiService {
    navigator = navigator;

    constructor( 
        public events: Events, 
        public platform: Platform  ) {

            platform.ready().then(()=>{
                cordova.MIDISender.getIncoming(function(note) {
                    this.events.publish('midi:note', note);

                    console.log(note.channel);   // 0-15
                    console.log(note.data); 	 // 1-128
                });
               
            })
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
        this.events.publish('midi:init', midi);

        var inputs = midi.inputs.values();
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = this.onMIDIMessage.bind(this);
        }

    }

    onMIDIMessage(event) {
        this.events.publish('midi:event', event);
        // console.log("msg received", event);
    }

    onMIDIFailure(e) {
        console.log(e);
    }
}