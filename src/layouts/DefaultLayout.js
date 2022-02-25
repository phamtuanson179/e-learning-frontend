import AppContent from 'components/AppContent'
import AppFooter from 'components/AppFooter'
import React from 'react'
import AppHeader from '../components/AppHeader'
import footerRoutes from "footer.routes";


const DefaultLayout = () => {
    return (
        <>
            <AppHeader
                action={{
                    type: "external",
                    route: "https://www.creative-tim.com/product/material-kit-react",
                    label: "Đăng nhập",
                    color: "info",
                }}
                sticky
            />
            <AppContent />
            <AppFooter
                content={footerRoutes}
            />

        </>
    )
}

export default DefaultLayout