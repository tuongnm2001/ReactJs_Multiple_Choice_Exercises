import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import './Dashboard.scss'
import ImgUser from '../../../assest/imgUser.png'
import ImgQuestion from '../../../assest/imgQuestion.png'
import ImgAnswer from '../../../assest/imgAnswer.png'
import imgQuizz from '../../../assest/imgQuiz.png'
import { useEffect, useState } from 'react';
import { getOverview } from '../../../services/apiService';

const Dashboard = (props) => {

    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetchOverview()
    }, [])

    const fetchOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT)
            let Qz = 0, Qs = 0, As = 0;
            Qz = res?.DT?.others?.countQuiz;
            Qs = res?.DT.others?.countQuestions;
            As = res?.DT?.others?.countAnswers;
            //process charts data
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz
                },
                {
                    "name": "Questions",
                    "Qs": Qs
                },
                {
                    "name": "Answers",
                    "As": As
                }
            ]
            setDataChart(data)
        }
    }

    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics Dashboard
            </div>

            <span className='description'>Here’s what’s going on at your business right now</span>

            <div className='content'>
                <div className='content-left'>
                    <div className='child'>
                        <div className='c-top'>
                            <span className='text-1'>Total Users</span>
                            <img className='icon' src={ImgUser} />
                        </div>
                        <div className='text-2'>
                            {
                                dataOverview && dataOverview.users && dataOverview.users.total ?
                                    <>{dataOverview.users.total}</>
                                    :
                                    <>0</>
                            }
                        </div>
                        <div className='sub-user'>
                            <div>
                                {
                                    dataOverview && dataOverview.users && dataOverview.users.countUsers ?
                                        <>{dataOverview.users.countUsers} Users</>
                                        :
                                        <>0</>
                                }
                            </div>

                            <div>
                                {
                                    dataOverview && dataOverview.users && dataOverview.users.countAdmin ?
                                        <>{dataOverview.users.countAdmin} Admin</>
                                        :
                                        <>0</>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='child'>
                        <div className='c-top'>
                            <span className='text-1'>Total Quizzes</span>
                            <img className='icon' src={imgQuizz} />
                        </div>
                        <div className='text-2'>

                            {
                                dataOverview && dataOverview.others && dataOverview.others.countQuiz ?
                                    <>{dataOverview.others.countQuiz}</>
                                    :
                                    <>0</>
                            }
                        </div >
                    </div>

                    <div className='child'>
                        <div className='c-top'>
                            <span className='text-1'>Total Questions</span>
                            <img className='icon' src={ImgQuestion} />
                        </div>

                        <div className='text-2'>
                            {
                                dataOverview && dataOverview.others && dataOverview.others.countQuestions ?
                                    <>{dataOverview.others.countQuestions}</>
                                    :
                                    <>0</>
                            }
                        </div >
                    </div>

                    <div className='child'>
                        <div className='c-top'>
                            <span className='text-1'>Total Answers</span>
                            <img className='icon' src={ImgAnswer} />
                        </div>
                        <div className='text-2'>
                            {
                                dataOverview && dataOverview.others && dataOverview.others.countAnswers ?
                                    <>{dataOverview.others.countAnswers}</>
                                    :
                                    <>0</>
                            }
                        </div >
                    </div>
                </div>

                <div className='content-right'>
                    <ResponsiveContainer width={'95%'} height={'90%'} className='barcharts'>
                        <BarChart data={dataChart} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#fe8396" />
                            <Bar dataKey="Qs" fill="#51c8ec" />
                            <Bar dataKey="As" fill="#84d9d2" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div >
    );
}

export default Dashboard;