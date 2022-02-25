const imagesPrefix = '../../assets/images/';
import image1 from '../../assets/images/team-1.jpg'
import image2 from '../../assets/images/team-2.jpg'
import image3 from '../../assets/images/team-3.jpg'
import image4 from '../../assets/images/team-4.jpg'
import image5 from '../../assets/images/team-5.jpg'
export default [
    {
        title: "Course",
        description: "Ở đây có một số khoá học dành cho bạn",
        items: [
            {
                image: image1,
                name: "Nhập môn công nghệ thông tin",
                count: 10,
                route: "/sections/page-sections/page-headers",
            },
            {
                image: image2,
                name: "Cơ sở dữ liệu",
                count: 14,
                route: "/sections/page-sections/features",
            },
            {
                image: image3,
                name: "Lập trình hướng đối tượng",
                count: 8,
                pro: true,
            },
            {
                image: image4,
                name: "Nhập môn trí tuệ nhân tạo",
                count: 1,
                pro: true,
            },
            {
                image: image5,
                name: "Blog Posts",
                count: 11,
                pro: true,
            },
        ],
    },
];
