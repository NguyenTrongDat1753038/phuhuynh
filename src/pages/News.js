import React from 'react';
import NavBar from '../Navigation/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, Typography, Toolbar, Grid, Paper, Link } from '@material-ui/core';

function News() {
  const useStyles = makeStyles();
  const classes  =  useStyles();
  const data = [
    {
      Title: 'Thông báo V/v đăng ký thực hiện đề tài Khóa luận tốt nghiệp/ Thực tập tốt nghiệp/ Thực tập dự án tốt nghiệp ',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13758',
      Date: '15/06/2021'
    },
    {
      Title: 'Chương trình trường hè "FIT Summer School on AI/ML"',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13754',
      Date: '09/06/2021'
    },
    {
      Title: 'Thông báo tuyển sinh chương trình đào tạo liên thông Đại học - Thạc sĩ (BS-MS) dành cho Khóa 2018',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13752',
      Date: '09/06/2021'
    },
    {
      Title: 'Chương trình ASEAN-Korea Youth Summit 2021',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13741',
      Date: '01/06/2021'
    },
    {
      Title: 'Hội thảo trực tuyến Giới thiệu chương trình đào tạo liên thông Đại học - Thạc sĩ (BS-MS)',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13740',
      Date: '31/05/2021'
    },
    {
      Title: '[CQ] Hình thức bảo vệ, danh sách thứ tự bảo vệ, GVPB các Hội đồng KLTN/TTTN/ĐATN khóa 2017, đợt 2 (T7/2021)',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13769',
      Date: '18/06/2021'
    },
    {
      Title: '[CQ] Thông báo hướng dẫn bảo vệ và nộp cuốn TRƯỚC bảo vệ KLTN/TTTN/ĐATN Khóa 2017, đợt 2 (tháng 7/2021)',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13759',
      Date: '11/06/2021'
    },
    {
      Title: 'Tổng hợp tài liệu Chương trình Giải mã ngành/ chuyên ngành dành cho Khóa 2019 - chương trình Chuẩn ĐHCQ',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13749',
      Date: '07/06/2021'
    },
    {
      Title: '[CQ] DSSV nộp đơn đăng ký bảo vệ/ huỷ bảo vệ KLTN/TTTN/ĐATN khóa 2017, đợt 2 (bảo vệ tháng 7/2021)',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13736',
      Date: '28/05/2021'
    },
    {
      Title: 'Thông báo hình thức dạy - học vào cuối HK2 đối với SV khóa 2020, ĐHCQ',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13729',
      Date: '24/05/2021'
    },
    {
      Title: 'Thời khóa biểu lớp 20HCB-HK3',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13765',
      Date: '16/06/2021'
    },
    {
      Title: 'Thông báo tạm dừng thi các lớp HCĐH',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13764',
      Date: '16/06/2021'
    },
    {
      Title: 'Thông báo v/v tạm dừng thi đối với các lớp Hoàn chỉnh Đại học',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13742',
      Date: '01/06/2021'
    },
    {
      Title: 'Thông báo v/v tổ chức dạy - học trực tuyến cho sinh viên từ ngày 10/5',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13704',
      Date: '07/05/2021'
    },
    {
      Title: 'V/v kiễm tra kết quả đăng ký học phần và chi tiết học phí các lớp HCĐH',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13668',
      Date: '19/04/2021'
    },
    {
      Title: '[CĐ] Bảng chuyển đổi học phần tương đương bậc cao đẳng- áp dụng K2018 trở về trước',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13686',
      Date: '27/04/2021'
    },
    {
      Title: '[CĐ] Kiểm tra kết quả ĐKHP và chi tiết học phí HK2/2020-2021 ',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13670',
      Date: '20/04/2021'
    },
    {
      Title: '[CĐ] Lớp Mạng máy tính nghỉ học ngày 09/04/2021',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13640',
      Date: '08/04/2021'
    },
    {
      Title: '[CĐ] Lớp Mạng máy tính nghỉ học ngày 26/3/2021',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13612',
      Date: '25/03/2021'
    },
    {
      Title: '[CĐ] Học phần dự kiến mở học kỳ 3, năm học 2020-2021',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13585',
      Date: '17/03/2021'
    },
    {
      Title: 'Thông báo về việc hoãn thi tuyển sinh trình độ Thạc sĩ, Tiến sĩ năm 2021 đợt 1 do dịch bệnh COVID-19',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13762',
      Date: '14/06/2021'
    },
    {
      Title: 'Thông báo v/v nộp đề cương luận án và báo cáo tổng quan của NCS khóa năm 2020',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13743',
      Date: '09/06/2021'
    },
    {
      Title: 'Thông báo về việc tạm dừng nộp hồ sơ bảo vệ luận án tiến sĩ trực tiếp chuyển sang hình thức trực tuyến để phòng chống dịch bệnh COVID-19',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13745',
      Date: '03/06/2021'
    },
    {
      Title: 'Hội thảo trực tuyến Giới thiệu chương trình đào tạo liên thông Đại học - Thạc sĩ (BS-MS)',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13733',
      Date: '31/05/2021'
    },
    {
      Title: 'V/v mời đăng ký tham dự trường hè "FIT Summer School on AI/ML"',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13735',
      Date: '27/05/2021'
    },
    {
      Title: 'Zalo Product Management Trainee Program',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13768',
      Date: '17/06/2021'
    },
    {
      Title: '[AdNovum] Hiring Junior Software Engineer',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13767',
      Date: '17/06/2021'
    },
    {
      Title: 'Chương trình MWG IT FRESHER 2021 - Thực tập sinh Công Nghệ Thông Tin tại Tập đoàn Thế Giới Di Động',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13766',
      Date: '16/06/2021'
    },
    {
      Title: 'Chương trình MoMo Talents 2021 - The M Factor chính thức mở cổng ứng tuyển',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13763',
      Date: '15/06/2021'
    },
    {
      Title: 'TMA Solutions - Tuyển Dụng Fresher',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13761',
      Date: '14/06/2021'
    },
    {
      Title: 'V/v mời quý Thầy Cô submit paper vào session "KISSTA 2021',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13607',
      Date: '24/03/2021'
    },
    {
      Title: 'V/v mời tham dự Seminar: Supporting teacher scripting with an ontological model of task-technique content knowledge',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13603',
      Date: '24/03/2021'
    },
    {
      Title: 'NICS 2020 - Extension of submission deadline for papers to September 21st, 2020',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13266',
      Date: '14/09/2020'
    },
    {
      Title: 'NICS 2020 call for paper',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=13184',
      Date: '30/07/2020'
    },
    {
      Title: 'Tutorial Seminar on Unsupervised HoloGAN for Neural Rendering',
      Link: 'https://www.fit.hcmus.edu.vn/vn/Default.aspx?tabid=292&newsid=12452',
      Date: '13/06/2019'
    }
  ]

  return (
    <div className = "news"> 
        <NavBar/>
        <Toolbar /> 
        <Grid container spacing={24}>
                    <Grid item xs>
                        <Paper className={classes.paper}>Tin tức mỗi ngày</Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={24}>
                    {
                        data.map(function(item){
                            return (
                                <Grid item sm={3} xs={12} key={item.Title}>
                                    <Paper className={classes.paper}>
                                        <Link to={item.Link}>
                                            <img className={classes.img}/>
                                        </Link>
                                    </Paper>
                                </Grid>
                                
                            )
                        })
                    }

                </Grid>
    </div>

  );
}

export default News;