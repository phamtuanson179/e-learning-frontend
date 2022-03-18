import PersonalInfo from "./PersonalInfo";
import ManageExams from './ManageExams'
import HistoryExams from "./HistoryExams";

export const MENUBAR_ADMIN = [
    {
        name: 'Lịch sử thi',
        component: <HistoryExams />,
    },
    {
        name: 'Thông tin cá nhân',
        component: <PersonalInfo />,
    },

    {
        name: 'Quản lý bài thi',
        component: <ManageExams />,
    },

    {
        name: 'Các trang quản lý khác của admin',
        component: null,
    },
]

export const MENUBAR_MEMBER = [
    {
        name: 'Lịch sử thi',
        component: <HistoryExams />,
    },
    {
        name: 'Thông tin cá nhân',
        component: <PersonalInfo />,
    },

    {
        name: 'Các trang quản lý khác của admin',
        component: null,
    },
]
