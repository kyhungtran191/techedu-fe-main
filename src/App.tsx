import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import BlankLayout from './layouts/BlankLayout'
import ClientMainLayout from './layouts/ClientMainLayout'
import OurPlan from './components/BlankOptions/OurPlan'
import Header from './layouts/BlankLayout/Header'
import CreateCourseLayout from './layouts/TeacherLayout/CreateCourseLayout'
import ManageCourseLayout from './layouts/ManageCourseLayout'
import AdminLayout from './layouts/AdminLayout'
import { ThemeProvider } from './components/custom/theme-provider'
import LearningSpaceHeader from './layouts/LearningSpaceLayout/LearningSpaceHeader'
import SetupProfileLayout from './layouts/TeacherLayout/SetupProfileLayout'
import TeacherMainLayout from './layouts/TeacherLayout/TeacherMainLayout'
import Loading from '@/components/Loading'
import AdminGuard from './guards/AdminGuard'
import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'

// Lazy loading for components
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

function App() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <Routes>
        {/* Main */}
        <Route
          path=''
          element={
            <ClientMainLayout>
              <div className=''>1</div>
            </ClientMainLayout>
          }
        />

        {/* Dont need to Gurad Route */}
        <Route
          path='/courses'
          element={
            <ClientMainLayout>
              <Outlet />
            </ClientMainLayout>
          }
        >
          <Route index element={<Courses />} />
          <Route path=':id' element={<CourseDetail />} />
        </Route>

        {/* End */}
        {/* Guest Guard */}
        <Route element={<GuestGuard></GuestGuard>}>
          <Route
            path='/signup'
            element={
              <BlankLayout headerOption={<OurPlan />}>
                <SignUp />
              </BlankLayout>
            }
          />
          <Route
            path='/login'
            element={
              <BlankLayout>
                <Login />
              </BlankLayout>
            }
          />
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
            <Route path='dashboard' index element={<Dashboard />} />
            <Route path='courses' element={<CoursesAdmin />} />
            <Route path='courses/:id' element={<CourseDetailAdmin />} />
            <Route path='students' element={<Students />} />
            <Route path='categories' element={<Category />} />
            <Route path='private-users' element={<PrivateUserManage />} />
            <Route path='instructors' element={<Instructors />} />
            <Route path='instructors/:id' element={<InstructorDetail />} />
            <Route path='accounts' element={<Accounts />} />
            <Route path='role' element={<Role />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
