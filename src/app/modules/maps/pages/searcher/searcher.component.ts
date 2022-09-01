import { Component, OnInit, ViewChild } from '@angular/core';
import { MapsService } from 'src/app/core/http/maps/maps.service';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '@env';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';
import { IPlace } from '@shared/interfaces/place.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {
  constructor(private mapsService: MapsService, httpClient: HttpClient) {
    if (typeof google === 'object' && typeof google.maps === 'object') {
      this.apiLoaded = of(true);
    } else {
      this.apiLoaded = httpClient
        .jsonp(
          `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}`,
          'callback'
        )
        .pipe(
          map(() => true),
          catchError(() => of(false))
        );
    }
  }

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  zoom = 14;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    maxZoom: 25,
    minZoom: 5
  };
  markers: any = [];
  infoContent = '';

  apiLoaded!: Observable<boolean>;
  errorMsg: string = '';
  isLoading: boolean = false;
  places$!: Observable<IPlace[]>;
  searchTerms = new Subject<string>();

  ngOnInit(): void {
    this.places$ = this.searchTerms.pipe(
      // wait 350ms after each keystroke before considering the term
      debounceTime(350),
      distinctUntilChanged(),
      switchMap((term: string) => this.mapsService.getAutocompletePlaces(term))
    );
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content;
    this.info.open(marker);
  }

  onChange(place: IPlace): void {
    if (!place?.place_id) {
      return;
    }
    this.isLoading = true;
    this.mapsService.getNearStores(place.place_id).subscribe((nearbyPlace) => {
      this.center = {
        lat: nearbyPlace.latLngLiteral!.lat,
        lng: nearbyPlace.latLngLiteral!.lng
      };

      this.markers = nearbyPlace.stores.map((store) => ({
        position: {
          lat: store.geometry.location.lat,
          lng: store.geometry.location.lng
        },
        label: {
          color: 'red',
          text: store.name
        },
        title: store.name,
        info: store.name,
        options: {
          animation: google.maps.Animation.BOUNCE
        }
      }));
      this.isLoading = false;
    });
  }
}
