import React, { useContext, useState } from 'react'
import {
    AppBar,
    Box,
    Button,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    Toolbar,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useLocation, useParams, } from 'react-router-dom';
import { DocContext } from './context/DocProvider';
import axios from 'axios'
import { jsPDF } from "jspdf";

const Navbar = () => {
    const url = useLocation();
    const { id } = useParams();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const openFileMenu = Boolean(anchorElMenu);
    const handleFileMenu = (e) => {
        anchorElMenu === null ? setAnchorElMenu(e.currentTarget) : setAnchorElMenu(null);
    }
    const handleCopyClick = async () => {
        try {
            await window.navigator.clipboard.writeText(`http://localhost:3000${url.pathname}`);
            alert("URL Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    };

    const { file, setFile, pdf, setPdf } = useContext(DocContext);

    // const handleChange = async (e) => {
    //     // setFile(e.target.files[0]);
    //     const file = e.target.files[0];
    //     if (file) {
    //         try {
    //             const config = {
    //                 headers: {
    //                     "Content-type": "application/x-www-form-urlencoded",
    //                 },
    //             };

    //             const data = new FormData();
    //             data.append("file", file);
    //             data.append("name", file.name);
    //             const response = await axios.post(`http://localhost:5000/uploadpdf/${id}`, data, config);
    //             setFile(response.data)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    const handleDownload = () => {
        const doc = new jsPDF();
        doc.text(`${pdf}`, 10, 10);
        doc.save(`Document ${id}.pdf`);
    }

    return (
        <AppBar position='fixed'
            sx={{
                width: '100%',
                height: '64px',
                backgroundColor: 'white',
                boxShadow: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0'
            }}>
            <Toolbar sx={{
                width: { sm: '765px', md: '816px' },
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0',
                padding: '0'
            }}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'black',
                    height: '100%',
                    width: '280px',
                }}>
                    <ArticleIcon sx={{ color: '#1976D2', fontSize: '40px' }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        color: 'black',
                        margin: '10px'
                    }}>
                        <input defaultValue='Untitled document' style={{ border: '0', fontSize: '18px', }} />
                        <Box>
                            <Button id='file-menu-button' aria-controls={openFileMenu ? 'file-menu' : undefined}
                                aria-haspopup='true'
                                aria-expanded={openFileMenu ? 'true' : undefined}
                                onClick={handleFileMenu}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    height: '20px',
                                    padding: '0',
                                    margin: '0 0 0 2px',
                                    color: 'black',
                                    textTransform: 'none',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    border: "none",
                                    cursor: 'pointer'
                                }}>File</Button>
                            <Menu id='file-menu'
                                anchorEl={anchorElMenu}
                                open={openFileMenu}
                                onClose={handleFileMenu}
                                MenuListProps={{
                                    'aria-labelledby': 'file-menu-button'
                                }}
                                sx={{ height: '200px', margin: '0', padding: '0' }}
                            >

                                <Paper >
                                    <MenuList dense sx={{ padding: '0', margin: '0' }}>
                                        <MenuItem dense sx={{ margin: '0' }} onClick={handleDownload}>
                                            <ListItemIcon>
                                                <FileDownloadOutlinedIcon fontSize='small' />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Download Pdf
                                            </ListItemText>
                                        </MenuItem>
                                    </MenuList>
                                </Paper>
                            </Menu>
                        </Box>

                    </Box>
                </Box>

                <Box style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 'auto',
                    height: 'auto',
                }}>
                    <Box style={{ borderRadius: '100px' }}>
                        <Button style={{ textTransform: 'none' }}
                            variant='contained'
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >Invite</Button>

                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            dense style={{ margin: '0', padding: '0' }}
                        >
                            <MenuItem dense onClick={handleCopyClick}
                                style={{
                                    margin: '0',
                                    borderRadius: '50px',
                                    backgroundColor: 'black',
                                    color: "#FFFFFF",
                                    '&:hover': { backgroundColor: '#1976D2' }
                                }}
                            >Copy-URL</MenuItem>

                        </Menu>
                    </Box>

                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar