import { Component, OnInit } from "@angular/core";
import { WebService } from "../../services/web.service";
@Component({
  selector: "app-ranking-list-page",
  templateUrl: "./ranking-list-page.component.html",
  styleUrls: ["./ranking-list-page.component.scss"]
})
export class RankingListPageComponent implements OnInit {
  users: any = [];
  rankings: any = [];
  user_name;
  user_rankingpoints;
  user_index;
  constructor(private dataService: WebService) {}

  usernameIsRequested = false;
  rankingIsRequested = false;

  ngOnInit() {
    this.getUserName();
    this.getRankingList();
  }
  onSelect(user) {
    this.getRankingList();
  }

  getRankingList() {
    this.dataService.getRankingList().subscribe(list => {
      list.forEach((item, index) => {
        if (item.firstname !== null) {
          this.users.push( item.firstname);
          this.rankings.push(item.rankingpoints);
        }
      });
      this.rankingIsRequested = true;
      this.updateUserRanking();
    });
  }
  getUserName() {
    let data;
    this.dataService.getUserName(data).subscribe(name => {
      this.user_name = name.firstname;
      this.usernameIsRequested = true;
      this.updateUserRanking();
    });
  }

  updateUserRanking() {
    if (this.usernameIsRequested === false) { return; }
    if (this.rankingIsRequested === false) { return; }

    this.user_rankingpoints = this.rankings[this.users.indexOf(this.user_name)];
    this.user_index= this.users.indexOf(this.user_name);
  }
}
