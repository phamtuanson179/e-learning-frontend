import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";




function DefaultNavbarDropdown({
  name,
  icon,
  children,
  collapseStatus,
  light,
  href,
  route,
  ...rest
}) {


  return (
    <>
      <Link to={route}>
        <MKBox
          {...rest}
          mx={1}
          p={1}
          display='flex'
          alignItems='baseline'
          color={light ? "white" : "dark"}
          opacity={light ? 1 : 0.6}
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          <MKTypography
            variant='body2'
            lineHeight={1}
            color='inherit'
            sx={{ alignSelf: "center", "& *": { verticalAlign: "middle" } }}
          >
            {icon}
          </MKTypography>
          <MKTypography
            variant='button'
            fontWeight='regular'
            textTransform='capitalize'
            color={light ? "white" : "dark"}
            sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
          >
            {name}
          </MKTypography>
        </MKBox>
      </Link>
    </>
  );
}

export default DefaultNavbarDropdown;
