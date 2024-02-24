import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import NotFound from './components/User/NotFound';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react';

const Layout = (props) => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path='/user'
                        element={
                            <PrivateRoute>
                                <ListQuiz />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path='admin'
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />

                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/detail/:id' element={<DetailQuiz />} />
                <Route path='*' element={<NotFound />} />

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Suspense>
    );
}

export default Layout;