import React from "react";
import { Navbar, Typography, Avatar, Collapse } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import SearchDialog from "../searchDialog/SearchDialog";
import ShareDialogBox from "../shareDialogBox/ShareDialogBox";

export default function Nav() {
    const [openNav, setOpenNav] = React.useState(false);

    // Check if user is authenticated
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const isAuthenticated = token !== null;

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={'/'} className="flex items-center">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={'/allblogs'} className="flex items-center">
                    Blogs
                </Link>
            </Typography>
            {!isAuthenticated ? (
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <Link to={'/SignIn'} className="flex items-center">
                        Login
                    </Link>
                </Typography>
            ) : null}
        </ul>
    );

    return (
        <>
            <Navbar
                className="sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-4 lg:px-8 lg:py-2"
            >
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to={'/'}>
                        <Typography
                            as="a"
                            className="mr-4 cursor-pointer py-1.5 text-xl font-bold flex gap-2 items-center"
                        >
                            <span>Bloggiest</span>
                        </Typography>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block">
                            {navList}
                        </div>
                        <div>
                            <SearchDialog />
                        </div>
                        <div className="hidden lg:block">
                            <ShareDialogBox />
                        </div>

                        {isAuthenticated && (
                            <div>
                                <Link to={'/dashboard'}>
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            src={user?.avatar || 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                                            alt={user?.name || 'avatar'}
                                            withBorder={true}
                                            className="p-0.5 text-red-500 w-10 h-10 cursor-pointer"
                                        />
                                        <Typography className="hidden lg:block">
                                            {user?.name || 'User'}
                                        </Typography>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <Collapse open={openNav}>
                    {navList}
                </Collapse>
            </Navbar>
        </>
    );
}
