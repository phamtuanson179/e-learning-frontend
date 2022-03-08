/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import TPCardItem from "components/TPCardItem";
import { Link } from "react-router-dom";
// Data
import data from "./courseInfo";





function BlockCourse() {
    const renderData = data.map(({ title, description, items }, idx) => (
        <Grid key={idx} container spacing={4}>
            {items.map(({ image, name, count, route, pro }, idx) => (
                <Grid item xs={12} md={4} sx={{ mb: 2 }} key={name}>
                    <Link to={pro ? "/" : route}>
                        <TPCardItem image={image} name={name} count={count} type={'Bài'} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    ));

    return (
        <MKBox component="section" py={6} >
            <Container>
                <Grid
                    container
                    item
                    xs={12}
                    lg={6}
                    flexDirection="column"
                    alignItems="center"
                    sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
                >
                    <MKTypography variant="h2" fontWeight="bold">
                        Khoá học
                    </MKTypography>
                    <MKTypography variant="body1" color="text">
                        Đây là các khoá học hiện có của chúng tôi
                    </MKTypography>
                </Grid>
            </Container>
            <Container sx={{ mt: 6 }}>{renderData}</Container>
        </MKBox>
    );
}

export default BlockCourse;
