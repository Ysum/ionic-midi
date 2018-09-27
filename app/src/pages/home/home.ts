import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MidiService } from '../../services/MidiService'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public midiService: MidiService) {
     midiService.onMidiInit();
  }

}
