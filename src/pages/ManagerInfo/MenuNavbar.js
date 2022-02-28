import { MENUBAR } from './constant'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

const MenuNavbar = (menuBar) => {

    return (
        <Box
            sx={{

            }}
        >
            <ul>
                {MENUBAR.map((item, idx) =>
                    <Link to={item.component}>
                        <li>{item.name}</li>
                    </Link>
                )}
            </ul>

        </Box>
    )
}

export default MenuNavbar