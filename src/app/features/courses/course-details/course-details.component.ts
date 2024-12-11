import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Course, Lesson } from '../../../core/models/course.model';
import { 
  ClockIcon, 
  UsersIcon, 
  StarIcon, 
  PlayIcon,
  CheckCircleIcon,
  LockIcon,
  BookOpenIcon
} from 'lucide-angular';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ClockIcon,
    UsersIcon,
    StarIcon,
    PlayIcon,
    CheckCircleIcon,
    LockIcon,
    BookOpenIcon
  ],
  template: `
    @if (course) {
      <div class="min-h-screen bg-gray-50 pt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <!-- Course Preview -->
              <div class="relative aspect-video bg-black rounded-lg overflow-hidden mb-8">
                @if (isPreviewPlaying) {
                  <video
                    #videoPlayer
                    class="w-full h-full"
                    controls
                    autoplay
                    (ended)="onVideoEnd()"
                  >
                    <source [src]="selectedLesson.videoUrl" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                } @else {
                  <div class="absolute inset-0">
                    <img
                      [src]="course.thumbnail"
                      [alt]="course.title"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <button
                        (click)="playVideo()"
                        class="p-4 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-opacity"
                      >
                        <lucide-play class="w-8 h-8 text-indigo-600"></lucide-play>
                      </button>
                    </div>
                  </div>
                }
              </div>

              <!-- Course Info -->
              <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">
                  {{ course.title }}
                </h1>
                <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                  <div class="flex items-center">
                    <lucide-clock class="w-4 h-4 mr-1"></lucide-clock>
                    {{ course.duration }} hours
                  </div>
                  <div class="flex items-center">
                    <lucide-users class="w-4 h-4 mr-1"></lucide-users>
                    {{ course.enrolledCount }} students
                  </div>
                  <div class="flex items-center">
                    <lucide-star class="w-4 h-4 mr-1 text-yellow-400"></lucide-star>
                    {{ course.rating }} ({{ Math.floor(course.enrolledCount * 0.6) }} reviews)
                  </div>
                </div>
                <p class="text-gray-600">{{ course.description }}</p>

                <!-- What You'll Learn -->
                <div class="mt-8">
                  <h2 class="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @for (point of learningPoints; track point) {
                      <div class="flex items-start">
                        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-gray-600">{{ point }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Requirements -->
                <div class="mt-8">
                  <h2 class="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                  <ul class="list-disc list-inside text-gray-600 space-y-2">
                    @for (requirement of requirements; track requirement) {
                      <li>{{ requirement }}</li>
                    }
                  </ul>
                </div>
              </div>

              <!-- Course Content -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                  <h2 class="text-xl font-semibold text-gray-900">Course Content</h2>
                  <div class="mt-2 flex items-center text-sm text-gray-500">
                    <lucide-book-open class="w-4 h-4 mr-1"></lucide-book-open>
                    <span>{{ course.lessons.length }} lessons</span>
                    <span class="mx-2">•</span>
                    <lucide-clock class="w-4 h-4 mr-1"></lucide-clock>
                    <span>{{ course.duration }} hours total</span>
                  </div>
                </div>
                <div class="divide-y divide-gray-200">
                  @for (lesson of course.lessons; track lesson.id) {
                    <button
                      (click)="selectLesson(lesson)"
                      [disabled]="!isEnrolled && lesson.order > 1"
                      class="w-full p-4 flex items-start space-x-4 text-left hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
                      [class.bg-gray-50]="selectedLesson.id === lesson.id"
                    >
                      <div class="flex-shrink-0 mt-1">
                        @if (completedLessons.includes(lesson.id)) {
                          <lucide-check-circle class="w-5 h-5 text-green-500"></lucide-check-circle>
                        } @else if (!isEnrolled && lesson.order > 1) {
                          <lucide-lock class="w-5 h-5 text-gray-400"></lucide-lock>
                        } @else {
                          <lucide-play class="w-5 h-5 text-gray-400"></lucide-play>
                        }
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium" 
                           [class.text-gray-900]="isEnrolled || lesson.order === 1"
                           [class.text-gray-400]="!isEnrolled && lesson.order > 1">
                          {{ lesson.title }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ lesson.duration }} hours
                        </p>
                      </div>
                    </button>
                  }
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="mt-8 lg:mt-0">
              <div class="sticky top-24">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                      <span class="text-3xl font-bold text-gray-900">
                        ${{ course.price }}
                      </span>
                    </div>
                    @if (!isEnrolled) {
                      <button
                        (click)="addToCart()"
                        class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Add to Cart
                      </button>
                    } @else {
                      <button
                        class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 cursor-default"
                        disabled
                      >
                        Enrolled
                      </button>
                    }
                    <p class="mt-4 text-center text-sm text-gray-500">
                      30-Day Money-Back Guarantee
                    </p>
                  </div>
                  <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <h3 class="text-sm font-medium text-gray-900">
                      This course includes:
                    </h3>
                    <ul class="mt-4 space-y-3 text-sm text-gray-500">
                      <li class="flex items-center">
                        <lucide-play class="w-4 h-4 mr-2"></lucide-play>
                        {{ course.duration }} hours on-demand video
                      </li>
                      <li class="flex items-center">
                        <lucide-users class="w-4 h-4 mr-2"></lucide-users>
                        Full lifetime access
                      </li>
                      <li class="flex items-center">
                        <lucide-star class="w-4 h-4 mr-2"></lucide-star>
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Instructor Info -->
                <div class="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div class="p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                      Your Instructor
                    </h3>
                    <div class="flex items-center">
                      <img
                        [src]="course.instructor.avatar"
                        [alt]="course.instructor.name"
                        class="w-12 h-12 rounded-full"
                      />
                      <div class="ml-4">
                        <h4 class="text-base font-medium text-gray-900">
                          {{ course.instructor.name }}
                        </h4>
                        <p class="text-sm text-gray-500">{{ course.category }} Expert</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class CourseDetailsComponent implements OnInit {
  course?: Course;
  selectedLesson!: Lesson;
  isPreviewPlaying = false;
  isEnrolled = false;
  completedLessons: string[] = [];
  Math = Math;

  // Mock data for course details
  learningPoints = [
    'Build professional web applications from scratch',
    'Master modern JavaScript concepts and practices',
    'Implement responsive design principles',
    'Work with popular frameworks and libraries',
    'Deploy applications to production environments',
    'Write clean, maintainable, and efficient code'
  ];

  requirements = [
    'Basic understanding of HTML, CSS, and JavaScript',
    'A computer with internet access',
    'No prior framework experience required',
    'Willingness to learn and practice'
  ];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe(course => {
        if (course) {
          this.course = course;
          this.selectedLesson = course.lessons[0];
          
          // Check if user is enrolled (mock implementation)
          this.authService.currentUser$.subscribe(user => {
            if (user) {
              // In a real application, you would check enrollment status from a service
              this.isEnrolled = Math.random() > 0.5;
              if (this.isEnrolled) {
                // Mock completed lessons
                this.completedLessons = course.lessons
                  .filter(() => Math.random() > 0.3)
                  .map(lesson => lesson.id);
              }
            }
          });
        }
      });
    }
  }

  selectLesson(lesson: Lesson): void {
    if (this.isEnrolled || lesson.order === 1) {
      this.selectedLesson = lesson;
      this.isPreviewPlaying = false;
    }
  }

  playVideo(): void {
    this.isPreviewPlaying = true;
  }

  onVideoEnd(): void {
    this.isPreviewPlaying = false;
  }

  addToCart(): void {
    if (this.course) {
      this.cartService.addItem(this.course);
    }
  }
}