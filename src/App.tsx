import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
// Partial - Layout
import BlankLayout from './layouts/BlankLayout'
import ClientMainLayout from './layouts/ClientMainLayout'
// import OurPlan from './components/BlankOptions/OurPlan'
import Header from './layouts/BlankLayout/Header'
import CreateCourseLayout from './layouts/TeacherLayout/CreateCourseLayout'
import ManageCourseLayout from './layouts/ManageCourseLayout'
import AdminLayout from './layouts/AdminLayout'
import { ThemeProvider } from './components/custom/theme-provider'
import LearningSpaceHeader from './layouts/LearningSpaceLayout/LearningSpaceHeader'
import SetupProfileLayout from './layouts/TeacherLayout/SetupProfileLayout'
import TeacherMainLayout from './layouts/TeacherLayout/TeacherMainLayout'

// Partial - Loading
import Loading from '@/components/Loading'

// Guard Custom
import AdminGuard from './guards/AdminGuard'
import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'
import PermissionsGuard from './guards/PermissionsGuard'
// Constant permissions
import { APP_PERMISSIONS } from './constants/permissions'
import NotFound from './pages/errors/NotFound'
import Unauthorized from './pages/errors/Unauthorized'
import { InstructorProfile } from './pages/teacher/main/profile'
import { useQueryClient } from '@tanstack/react-query'
import { useEditor } from '@tiptap/react'

// Lazy loading for components
const ResendEmail = lazy(() => import('./pages/general/resend-email'))
const Photo = lazy(() => import('./pages/teacher/main/instructor-info/photo'))
const BasicInfo = lazy(() => import('./pages/teacher/main/instructor-info/basic-info'))
const ConfirmPassword = lazy(() => import('./pages/general/confirm-password'))
const ConfirmEmail = lazy(() => import('./pages/general/confirm-email'))
const ResetPassword = lazy(() => import('./pages/general/reset-password'))
const ForgotPassword = lazy(() => import('./pages/general/forgot-password'))
const SignUp = lazy(() => import('./pages/general/SignUp'))
const Login = lazy(() => import('./pages/general/Login'))
const Courses = lazy(() => import('./pages/general/Courses'))
const CourseDetail = lazy(() => import('./pages/general/Courses/CourseDetail'))
const CourseLearningSpace = lazy(() => import('./pages/general/Courses/CourseLearningSpace'))
const CreateCourse = lazy(() => import('./pages/teacher/Courses/CreateCourse'))
const Cart = lazy(() => import('./pages/general/Cart'))
const Ads = lazy(() => import('./pages/general/ads'))
const Dashboard = lazy(() => import('./pages/admin/dashboard'))
const Curriculum = lazy(() => import('./pages/teacher/Courses/ManageCourse/Curriculum'))
const Overview = lazy(() => import('./pages/teacher/Courses/ManageCourse/Overview'))
const LandingPage = lazy(() => import('./pages/teacher/Courses/ManageCourse/Landing'))
const CourseMessage = lazy(() => import('./pages/teacher/Courses/ManageCourse/CourseMessage'))
const Price = lazy(() => import('./pages/teacher/Courses/ManageCourse/Price'))
const Checkout = lazy(() => import('./pages/general/Checkout'))
const Profile = lazy(() => import('./pages/general/profile'))
const EnrolledCourses = lazy(() => import('./pages/student/enrolled-courses'))
const Role = lazy(() => import('./pages/admin/role'))
const SetupProfile = lazy(() => import('./pages/teacher/SetupProfile'))
const CourseManage = lazy(() => import('./pages/teacher/main/courses-manage'))
const CoursesAdmin = lazy(() => import('./pages/admin/courses/CoursesAdmin'))
const Students = lazy(() => import('./pages/admin/users/students'))
const Instructors = lazy(() => import('./pages/admin/users/instructors'))
const Accounts = lazy(() => import('./pages/admin/users/accounts'))
const Category = lazy(() => import('./pages/admin/category'))
const PrivateUserManage = lazy(() => import('./pages/admin/private-users'))
const CourseDetailAdmin = lazy(() => import('./pages/admin/courses/CourseDetailAdmin'))
const InstructorDetail = lazy(() => import('./pages/admin/users/instructors/InstructorDetail'))
const PreviewCourse = lazy(() => import('./pages/general/Courses/preview-draft'))

function App() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <Routes>
        {/* Main */}
        <Route
          path='/'
          element={
            <ClientMainLayout>
              <Courses />
            </ClientMainLayout>
          }
        />

        {/* Dont need to Guard Route */}
        <Route
          path='/courses'
          element={
            <ClientMainLayout>
              <Outlet />
            </ClientMainLayout>
          }
        >
          <Route path=':id' element={<CourseDetail />} />
        </Route>
        {/* End */}
        {/* Guest Guard */}
        <Route element={<GuestGuard></GuestGuard>}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />

          <Route path='/confirm-email/:userId/token/:token' element={<ConfirmEmail></ConfirmEmail>}></Route>
          <Route
            path='/resend-email'
            element={
              <BlankLayout>
                <ResendEmail></ResendEmail>
              </BlankLayout>
            }
          ></Route>
          <Route
            path='/confirm-password/:userId/token/:token'
            element={
              <BlankLayout>
                <ConfirmPassword></ConfirmPassword>
              </BlankLayout>
            }
          ></Route>
          <Route
            path='/reset-password/:userId/token/:token'
            element={
              <BlankLayout>
                <ResetPassword></ResetPassword>
              </BlankLayout>
            }
          ></Route>
          <Route
            path='/forgot-password'
            element={
              <BlankLayout>
                <ForgotPassword></ForgotPassword>
              </BlankLayout>
            }
          ></Route>
        </Route>
        {/* End */}

        {/* AuthGuard Page */}
        <Route element={<AuthGuard />}>
          {/* Manage Course Routes */}
          <Route
            path='/teacher/course/:id/manage'
            element={
              <ManageCourseLayout>
                <Outlet />
              </ManageCourseLayout>
            }
          >
            <Route path='curriculum' element={<Curriculum />} />
            <Route path='overview' element={<Overview />} />
            <Route path='landing-page' element={<LandingPage />} />
            <Route path='course-messages' element={<CourseMessage />} />
            <Route path='price' element={<Price />} />
          </Route>
          {/* Teacher Routes */}
          <Route
            path='/teacher/create-course'
            element={
              <CreateCourseLayout>
                <CreateCourse />
              </CreateCourseLayout>
            }
          />

          <Route
            path='/teacher/setup-account'
            element={
              <SetupProfileLayout>
                <SetupProfile />
              </SetupProfileLayout>
            }
          />

          <Route
            path='/teacher/'
            element={
              <TeacherMainLayout>
                <Outlet />
              </TeacherMainLayout>
            }
          >
            <Route path='courses' element={<CourseManage />} />
            <Route path='profile' element={<InstructorProfile></InstructorProfile>}>
              <Route index path='basic-info' element={<BasicInfo />} />
              <Route index path='photo' element={<Photo />} />
            </Route>
          </Route>

          {/* Learning Space */}
          <Route
            path='/courses/:slug/learn/:lecture'
            element={
              <ClientMainLayout HeaderCustom={LearningSpaceHeader}>
                <CourseLearningSpace />
              </ClientMainLayout>
            }
          />
          {/* Miscellaneous */}
          <Route
            path='/my-cart'
            element={
              <ClientMainLayout isSideBar={false} HeaderCustom={Header}>
                <Cart />
              </ClientMainLayout>
            }
          />
          <Route path='/checkout' element={<Checkout />} />

          <Route path='/preview-draft-course' element={<PreviewCourse />}></Route>

          <Route
            path='/profile'
            element={
              <ClientMainLayout>
                <Profile />
              </ClientMainLayout>
            }
          />

          <Route
            path='/enrolled-courses'
            element={
              <ClientMainLayout>
                <EnrolledCourses />
              </ClientMainLayout>
            }
          />
        </Route>
        {/* End */}

        {/* Admin */}
        <Route element={<AdminGuard />}>
          <Route
            path='/admin/'
            element={
              <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
                <AdminLayout />
              </ThemeProvider>
            }
          >
            <Route
              path='dashboard'
              index
              element={
                <PermissionsGuard permissions={[APP_PERMISSIONS.DASHBOARD.VIEW as string]}>
                  <Dashboard />
                </PermissionsGuard>
              }
            />

            <Route path='courses' element={<CoursesAdmin />} />
            <Route path='courses/:id/:instructorId' element={<CourseDetailAdmin />} />
            <Route path='students' element={<Students />} />
            <Route path='categories' element={<Category />} />
            <Route path='private-users' element={<PrivateUserManage />} />
            <Route path='instructors' element={<Instructors />} />
            <Route path='instructors/:id' element={<InstructorDetail />} />
            <Route path='accounts' element={<Accounts />} />
            <Route path='role' element={<Role />} />
          </Route>
        </Route>
        {/* Error Route */}
        <Route path='/501' element={<Unauthorized></Unauthorized>}></Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
