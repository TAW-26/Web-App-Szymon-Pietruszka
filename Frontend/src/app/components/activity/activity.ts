import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivityItem, UserRatingsResponse, UserReviewsResponse } from '../../services/models/data.models';
import { AuthService } from '../../services/auth/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-activity',
  imports: [],
  templateUrl: './activity.html',
  styleUrl: './activity.scss',
})
export class Activity implements OnInit {
  public activities: ActivityItem[] = []

  constructor(
    private authService: AuthService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUserActivity();
  }

  loadUserActivity(): void {
    forkJoin({
      reviewsRes: this.authService.getUserReviews(),
      ratingsRes: this.authService.getUserRatings()
    }).subscribe({
      next: (result) => {
        this.activities = this.mergeActivities(result.reviewsRes, result.ratingsRes);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to load user activity: ", err);
      }
    });
  }

  private mergeActivities(reviewsRes: UserReviewsResponse, ratingsRes: UserRatingsResponse): ActivityItem[] {
    const activityMap = new Map<string, ActivityItem>();

    if (ratingsRes && ratingsRes.ratings) {
      ratingsRes.ratings.forEach(r => {
        const title = r.id_movie.title;
        activityMap.set(title, {
          title: title,
          movieRating: r.id_movie.rating,
          rating: r.rating,
          text: null,
          createdAt: ''
        });
      });
    }

    if (reviewsRes && reviewsRes.review) {
      reviewsRes.review.forEach(rev => {
        const title = rev.id_movie.title;
        
        if (activityMap.has(title)) {
          const existing = activityMap.get(title)!;
          existing.text = rev.text;
          existing.createdAt = rev.created_at;
        }
        else {
          activityMap.set(title, {
            title: title,
            movieRating: rev.id_movie.rating,
            rating: null,
            text: rev.text,
            createdAt: rev.created_at
          });
        }
      });
    }

    return Array.from(activityMap.values());
  }
}