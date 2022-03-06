// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

// Presentation page components
import ExampleCard from "./ExampleCard";

// Data
import data from "./courseInfo";
import examAPI from "api/examAPI";
import { useEffect } from "react";

function BlockCourse() {
  const getListExamsForRoom = async () => {
    const params = {
      room: "AI",
    };
    await examAPI.getListExamsForRoom(params).then((res) => {
      console.log({ res });
    });
  };

  useEffect(() => {
    getListExamsForRoom();
  }, []);

  const renderData = data.map(({ title, description, items }) => (
    <Grid container spacing={4}>
      {items.map(({ image, name, count, route, pro }, idx) => (
        <Grid item xs={12} md={4} sx={{ mb: 2 }} key={name}>
          <Link to={pro ? "/" : route}>
            <ExampleCard image={image} name={name} count={count} pro={pro} />
          </Link>
        </Grid>
      ))}
    </Grid>
  ));

  return (
    <MKBox component='section' py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection='column'
          alignItems='center'
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKTypography variant='h2' fontWeight='bold'>
            Các bài thi
          </MKTypography>
          <MKTypography variant='body1' color='text'>
            Đây là các bài thi mà bạn có thể thi
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>{renderData}</Container>
    </MKBox>
  );
}

export default BlockCourse;
