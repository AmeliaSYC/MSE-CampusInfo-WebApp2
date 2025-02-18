import { Component, Injectable, NgModule, OnInit, ViewChild, signal, viewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps'
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { log } from 'console';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    GoogleMapsModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonToggleModule
],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})

export class LocationComponent implements OnInit{
  hideSingleSelectionIndicator = signal(true);
  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }

  accordion = viewChild.required(MatAccordion);

  ngOnInit(): void {}

  @ViewChild(GoogleMap, {static: false}) map!: GoogleMap;
  @ViewChild(MapInfoWindow, {static: false}) infoWindow!: MapInfoWindow

  // Map Options
  ZLLatLng = {lat: 47.37762379999999, lng: 8.5328155}; 
  ZLmapOptions: google.maps.MapOptions = {
    mapId: "mapZL",
    center: this.ZLLatLng,
    maxZoom: 20,
    minZoom: 15,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
  };

  TELatLng = {lat: 47.4974764, lng: 8.7304915};
  TEmapOptions: google.maps.MapOptions = {
    mapId: "mapTE",
    center: this.TELatLng,
    maxZoom: 20,
    minZoom: 15,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
  };

  HWZLatLng = {lat: 47.3767886, lng: 8.5338216};
  HWZmapOptions: google.maps.MapOptions = {
    center: this.HWZLatLng,
    maxZoom: 20,
    minZoom: 15,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
  };

  LAALatLng = {lat: 47.3776489, lng: 8.5346489};
  LAAmapOptions: google.maps.MapOptions = {
    center: this.LAALatLng,
    maxZoom: 20,
    minZoom: 15,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
  };

  FHGRLatLng = {lat: 47.3804677, lng: 8.536895399999999};
  FHGRmapOptions: google.maps.MapOptions = {
    center: this.FHGRLatLng,
    maxZoom: 20,
    minZoom: 15,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
  };

  HESSOLatLng = {lat: 46.5231035, lng: 6.6103915};
  HESSOmapOptions: google.maps.MapOptions = {
    center: this.HESSOLatLng,
    maxZoom: 20,
    minZoom: 15,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };
}