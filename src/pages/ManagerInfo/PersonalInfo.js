import { useEffect, useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { Box } from "@mui/material";
import infoAPI from "api/infoAPI";

const PersonalInfo = () => {
    const [checked, setChecked] = useState(true);
    useEffect(() => {
        const data = async () => {
            const result = await infoAPI.getInfo();
            console.log({ result })
        }
        data()
    }, [])

    const handleChecked = () => setChecked(!checked);

    return (
        <>
            <h3>Thông tin cá nhân</h3>
        </>
    );
}

export default PersonalInfo;