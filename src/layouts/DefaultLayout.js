import TPAppContent from 'components/TPAppContent'
import TPAppFooter from 'components/TPAppFooter'
import React from 'react'
import TPAppHeader from '../components/TPAppHeader'
import footerRoutes from "footer.routes";


const DefaultLayout = () => {
    return (
        <>
            <TPAppHeader
                action={{
                    type: "external",
                    route: "https://www.creative-tim.com/product/material-kit-react",
                    label: "Đăng nhập",
                    color: "info",
                }}
                sticky
            />
            <TPAppContent />
            <TPAppFooter
                content={footerRoutes}
            />

        </>
    )
}

export default DefaultLayout