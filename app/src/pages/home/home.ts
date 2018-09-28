import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, Platform } from 'ionic-angular';
import { MidiService } from '../../services/MidiService'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public midiEvent:any;

  constructor(
    public navCtrl: NavController, 
    public midiService: MidiService, 
    public events: Events,
    public platform: Platform,
    public ref: ChangeDetectorRef) {

      platform.ready().then(()=> {
        // midiService.onMidiInit();
      })
    
      events.subscribe('midi:note', (msg) => {
        console.log(msg);
        this.midiEvent = msg;
        ref.detectChanges()
      })
    }

}
