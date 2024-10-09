import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import BlankLayout from './layouts/BlankLayout'
import SignUp from './pages/general/SignUp'
import Login from './pages/general/Login'
import ClientMainLayout from './layouts/ClientMainLayout'
import Courses from './pages/general/Courses'
import CourseDetail from './pages/general/Courses/CourseDetail'
import CourseLearningSpace from './pages/general/Courses/CourseLearningSpace'
import CreateCourse from './pages/teacher/Courses/CreateCourse'
import Cart from './pages/general/Cart'
import OurPlan from './components/BlankOptions/OurPlan'
import Header from './layouts/BlankLayout/Header'
import CreateCourseLayout from './layouts/TeacherLayout/CreateCourseLayout'
import ManageCourseLayout from './layouts/ManageCourseLayout'
import Curriculum from './pages/teacher/Courses/ManageCourse/Curriculum'
import Overview from './pages/teacher/Courses/ManageCourse/Overview'
import LandingPage from './pages/teacher/Courses/ManageCourse/Landing'
import Ads from './pages/general/ads'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/dashboard'
import { ThemeProvider } from './components/custom/theme-provider'
import CourseMessage from './pages/teacher/Courses/ManageCourse/CourseMessage'
import Price from './pages/teacher/Courses/ManageCourse/Price'
import Checkout from './pages/general/Checkout'
import Profile from './pages/general/profile'
import EnrolledCourses from './pages/student/enrolled-courses'
import LearningSpaceHeader from './layouts/LearningSpaceLayout/LearningSpaceHeader'
import { CourseSetUpContextProvider } from './context/CourseSetUpContext'
// Already Login cant go

function App() {
  const isAuth = true
  const navigate = useNavigate()
  function AuthGuard() {
    return isAuth ? <Outlet></Outlet> : navigate('/')
  }
  return (
    <>
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

        {/* Nested Routes for Courses */}
        <Route
          path='/courses'
          element={
            <ClientMainLayout>
              <Courses></Courses>
            </ClientMainLayout>
          }
        >
          <Route index element={<Courses />} />
          <Route path=':id' element={<CourseDetail />} />
        </Route>

        <Route
          path='/courses/:slug/learn/:lecture'
          element={
            <ClientMainLayout HeaderCustom={LearningSpaceHeader}>
              <CourseLearningSpace />
            </ClientMainLayout>
          }
        />

        {/* General */}
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
        <Route
          path='/ads'
          element={
            <BlankLayout headerOption={<OurPlan />} isFooter>
              <Ads />
            </BlankLayout>
          }
        />
        <Route
          path='/my-cart'
          element={
            <ClientMainLayout isSideBar={false} HeaderCustom={Header}>
              <Cart />
            </ClientMainLayout>
          }
        />

        {/* Teacher Routes */}
        <Route
          path='/teacher/create-course'
          element={
            <CreateCourseLayout>
              <CreateCourse />
            </CreateCourseLayout>
          }
        />

        {/* Nested Routes for Teacher Course Management */}
        <Route
          path='/teacher/course/:id/manage'
          element={
            <ManageCourseLayout>
              <Outlet />
            </ManageCourseLayout>
          }
        >
          <Route path='curriculum' element={<Curriculum />} />
          <Route path='course-overview' element={<Overview />} />
          <Route path='landing-page' element={<LandingPage />} />
          <Route path='course-messages' element={<CourseMessage />} />
          <Route path='price' element={<Price />} />
        </Route>

        {/* Miscellaneous */}
        <Route path='/checkout' element={<Checkout></Checkout>}></Route>
        <Route
          path='/profile'
          element={
            <ClientMainLayout>
              <Profile></Profile>
            </ClientMainLayout>
          }
        />
        <Route
          path='/enrolled-courses'
          element={
            <ClientMainLayout>
              <EnrolledCourses></EnrolledCourses>
            </ClientMainLayout>
          }
        />
        {/* Admin  */}
        <Route
          path='/admin/'
          element={
            <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
              <AdminLayout></AdminLayout>
            </ThemeProvider>
          }
        >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='courses' element={<div>Tasks</div>} />
        </Route>

        {/* End Admin */}
      </Routes>
    </>
  )
}

export default App
