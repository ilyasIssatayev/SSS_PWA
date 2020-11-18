import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-slide-fullpage",
  templateUrl: "./slide-fullpage.component.html",
  styleUrls: ["./slide-fullpage.component.scss"]
})
export class SlideFullpageComponent implements OnInit {
  config: any;
  fullpage_api: any;

  constructor() {
    // for more details on config options please visit fullPage.js docs
    this.config = {
      // fullpage options
      licenseKey: "YOUR LICENSE KEY HERE",
      anchors: ["main", "settings", "Ranking", "VEM", "lastPage"],
      menu: "#menu",
      paddingTop: 10,
      controlArrows: true,
      dragAndMove: true,
      scrollingSpeed: 500,

      // fullpage callbacks
      afterResize: () => {
        //this.renderer.appendChild(this.fp_directive.nativeElement, section);
        //this.fullpage_api.build(); // <-- here
      },
      afterLoad: (origin, destination, direction) => {
        console.log(origin.index);
      }
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
    this.fullpage_api.setAllowScrolling(false, 'down, up');
    this.fullpage_api.setKeyboardScrolling(false, 'down, up');
  }

  ngOnInit() {}
}
