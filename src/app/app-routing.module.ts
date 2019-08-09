import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

const routes: Routes = [
  { path: '', component: AudioPlayerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
