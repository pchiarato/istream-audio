import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  audioFile = null;
  playing = false;
  duration = 0;
  currentTime = 0;
  durationMin = '0';
  currentTimeMin = '0';
  statusBar = 0;
  doneCheckingDuration = false;
  dragging = false;
  translate = 0;

  @ViewChild('audio_p') player: ElementRef;
  @ViewChild('slider') slider: ElementRef;

  constructor(private http: HttpClient) {}
  ngOnInit() {

   this.audioFile = 'http://localhost:4000/audio';
   // this.http.get('http://localhost:4000/audio', {responseType: 'arraybuffer'}).subscribe(f => this.audioFile = f);
  }
  timeUpdate() {
    if (!this.dragging) {
      if (!this.doneCheckingDuration) {
        this.duration = this.player.nativeElement.duration;
        this.durationMin = this.decToMin(this.player.nativeElement.duration);
        this.doneCheckingDuration = true;
       }
      const currentTime = this.player.nativeElement.currentTime;
      const duration = this.player.nativeElement.duration;

      if (Math.floor(currentTime) !== Math.floor(this.currentTime)) {
        this.currentTime = currentTime;
      }
      this.statusBar = Math.floor((currentTime / duration) * 100);

      this.slider.nativeElement.style.background = `
    linear-gradient(90deg, rgb(30,174,166) ${this.statusBar + 3}%, #ccc ${this.statusBar + 3}%)`;


     //  const percent = Math.min((10 / duration) * currentTime * 10, 100);
      this.currentTimeMin = this.decToMin(currentTime);
      // this.setPercentage(this.statusBar);
    }

  }

  updateTrack(e) {
    console.log(e, 'e');
    console.log('track target', +e.target.value);
    this.player.nativeElement.currentTime = +e.target.value;
    this.slider.nativeElement.style.background = `
    linear-gradient(90deg, rgb(30,174,166) ${(e.target.value / e.target.max) * 100}%, #ccc ${(e.target.value / e.target.max) * 100}%)`;

    console.log('current track time ', this.slider.nativeElement);
  }

  decToMin(seconds: number) {
   const m = Math.floor(seconds / 60);
   const s = Math.floor(seconds % 60);
   const result = (m + ':' + (s < 10 ? '0' : '') + s);
   // console.log(result);
   return result;
  }

  // setPercentage(percentage) {
  //   this.progress.nativeElement.style.transform = `scaleX(${percentage / 100})`;
  //   this.trackThumb.nativeElement.style.transform = `translate(${(percentage / 100) * this.sliderContainer.nativeElement.offsetWidth}px)`;
  // }

  onTrackUpdate(e: MouseEvent) {
  //   if (this.dragging) {
  //     this.thumbIndicator.nativeElement.style.transform = `scale(1.3)`;
  //     this.translate = e.clientX - this.sliderContainer.nativeElement.offsetLeft;
  //     if (this.translate > 260) {
  //       this.translate = 260;
  //     } else if (this.translate < 0) {
  //       this.translate = 0;
  //     }
  //     this.progress.nativeElement.style.transform = `scaleX(${this.translate / this.sliderContainer.nativeElement.offsetWidth})`;
  //     this.setPercentage((this.translate / this.sliderContainer.nativeElement.offsetWidth) * 100);
  //     this.player.nativeElement.currentTime = (this.translate / this.sliderContainer.nativeElement.offsetWidth) * 100;
  //     console.log(this.player.nativeElement.currentTime, (this.translate / this.sliderContainer.nativeElement.offsetWidth) * 100);

  //   } else if (!this.dragging) {
  //     this.thumbIndicator.nativeElement.style.transform = `scale(1)`;
  //   }
   }

}
