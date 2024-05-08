/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-lonely-if */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable import/no-extraneous-dependencies */
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import React, { useEffect, useState } from "react";
import LightGallery from "lightgallery/react/Lightgallery.es5";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";

import {
    Box,
    Tab,
    Grid,
    Tabs,
    useTheme,
    Button,
    Snackbar,
    IconButton,
    ToggleButtonGroup,
    ToggleButton,
    Checkbox,
    Skeleton,
    Alert,
    CircularProgress,
    AppBar,
    CardMedia,
} from "@mui/material";

// import { products } from "src/_mock/products"; // Pagination styles

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { TabList, TabPanel, TabContext } from "@mui/lab";

import { bgBlur } from "src/theme/css";
import {
    products,
    DenimJeansproducts,
    DenimShortsproducts,
    StraightJeansproducts,
    DenimSkirtTopproducts,
    Garara,
    Patiyala,
    ShortFrock,
    LongFrock,
    Choli,
} from "src/_mock/products";

import "./styles.css";
// import ProductCard from "../product-card";
// import ProductCartWomen from "../product-cart-women";
// import ProductCartDenimJeans from "../ProductCartDenimJeans";
// import ProductCartStraightJeans from "../ProductCartStraightJeans";
// import ProductCartDenimShorts from "../ProductCartDenimShorts";
// import ProductCartDenimSkirtTop from "../ProductCartDenimSkirtTop";
// import ProductCartGarara from "../ProductCartGarara";
// import ProductCartPatiyala from "../ProductCartPatiyala";
// import ProductCartShortFrock from "../ProductCartShortFrock";
// import ProductCartLongFrock from "../ProductCartLongFrock";
// import ProductcartCholi from "../ProductcartCholi";
// import API from "../../API/api";
import API from "../../api/api";
// import API from "../../../api/api";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

// Bhavy import Starts
import { connect } from "react-redux";
import { fetchCategoryList, fetchCategoryNiItem } from "../../redux/Action";



// Bhavy import Starts


const testing = (props) => {
    const theme = useTheme();
    const firstCatName = props?.cl?.Categorylist?.firstCategoryName
    console.log(props?.cl, 'props');

    const [value, setValue] = useState(`${firstCatName}`);
    console.log(firstCatName, '-------------firstCatName')
    // console.log(value)
    const history = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setValue(firstCatName);
    }, [firstCatName]);

    // fetch category List start
    const [categoryList, setCategoryList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [showProgress, setShowProgress] = useState(true);



    React.useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get("Id");
    }, [location.search]);

    const fetchTableData = async () => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get("cSearch");
        const nid = localStorage.getItem("nid");

        setTimeout(() => {
            setShowProgress(false);
        }, 1000);

        try {
            if (value !== undefined && value !== "") {
                let url;
                if (id !== null && id !== undefined) {
                    // If 'cSearch' parameter exists in the URL query, use it
                    url = `/api/design/CustomerDashboard?cSearch=${id}&nCustId=${nid}`;
                } else {
                    // If 'cSearch' parameter is not found, use 'value'

                    url = `/api/design/CustomerDashboard?cSearch=${value}&nCustId=${nid}`;
                }

                const response = await API.get(url);

                if (response.status === 200) {
                    setShowProgress(false);
                }
                const len = response.data.design;
                setCategoryList(len);
                console.log(len, 'Items of First Category:', value)

            }
        } catch (error) {
            console.error("API Error:", error);
            setShowProgress(false);
        }
    };

    React.useEffect(() => {
        // Scroll to the top of the page when the active tab changes
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [value]); // Trigger whenever the active tab (value) changes

    React.useEffect(() => {
        fetchTableData();
    }, [value]);

    const fetchTableImageData = async () => {
        const nid = localStorage.getItem("nid");

        try {
            const url = `/api/design/CustomerDashboard?cSearch=${value}&nCustId=${nid}`;

            const response = await API.get(url);
            if (response.status === 200) {
                const len = response.data.design;
                setImageList(len);
                console.log(len, 'Items of Category')
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    React.useEffect(() => {
        fetchTableImageData();
    }, []);



    React.useEffect(() => {
        props.loadcategory();
        props.loadcategoryniItems();
    }, [])
    // console.log();
    // console.log(props?.cl?.Categorylist?.firstCategoryName, 'Fierst')
    // console.log(props?.cl?.Categorylist?.cList, 'ALLL')

    const getData = props?.cl?.Categorylist?.cList

    return (
        <>
            {showProgress ? (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "85%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    {apiError === true ? (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "80%",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    "@media (min-width:767px)": { mb: 2, mt: 1 },
                                    mb: 1,
                                    px: 2,
                                    fontSize: 20,
                                    fontWeight: 700,
                                    textAlign: "center",
                                }}
                            >
                                No Data Available
                            </Typography>
                        </Box>
                    ) : (
                        <TabContext value={value} className="customTabPanel">
                            {/* ======Top Categories display Start====== */}
                            <Box
                                sx={{
                                    borderBottom: 0,
                                    borderColor: "Boxider",
                                    backgroundColor: "#fff",
                                    position: "fixed",
                                    top: 0,
                                    width: "100%",
                                    zIndex: 2,
                                    // ...bgBlur({
                                    //   color: theme.palette.background.default,
                                    // }),
                                    "& button": {
                                        padding: "6px 5px",
                                        justifyContent: "start",
                                        minHeight: "42px",
                                        maxWidth: "55px",
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        minWidth: "75px",
                                    },
                                }}
                            >
                                <TabList
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    onChange={handleChange}
                                    sx={{
                                        boxShadow: "0px 0px 5px 0px #ddd",
                                        borderBottom: "1px solid #ddd",
                                        // ml:'15px',
                                        "& .MuiTabs-scroller ": {
                                            mx: "10px",
                                        },
                                    }}
                                >

                                    {/* -----Top Categories display Start----- */}
                                    {/* {categoryName?.map((data) => ( */}
                                    {getData?.map((data) => (
                                        <Tab
                                            // label={`${data.cCategoryName}`}
                                            label={
                                                <>
                                                    <Box
                                                        sx={{
                                                            maxWidth: "55px",
                                                            maxHeight: "55px",
                                                            borderRadius: "10%",
                                                            mb: 1,
                                                            boxShadow: "0 0 7px 0px #ddd",
                                                        }}
                                                    >
                                                        <Box
                                                            component="img"
                                                            // src={data.cCategoryThumb}
                                                            src={`data:image/jpeg;base64,${data.cThumb}`}
                                                            // src={data.cThumb}
                                                            sx={{
                                                                mb: 1,
                                                                objectFit: "cover",
                                                                borderRadius: "10%",
                                                            }}
                                                        />
                                                    </Box>
                                                    {data.cCategoryName}
                                                </>
                                            }
                                            value={`${data.cCategoryName}`}
                                        />
                                    ))}
                                    {/* -----Top Categories display Ends----- */}

                                </TabList>
                            </Box>
                            {/* ======Top Categories display Ends====== */}


                            <Box
                                sx={{
                                    backgroundColor: "#fff",
                                    color: "#333",
                                    mt: "70px",
                                    "& .MuiTabPanel-root": { padding: 0 },
                                    fontFamily: "Arial",
                                }}
                            >

                                {/* -----Slider + Items Mapping Start----- */}
                                {getData?.map((data) => (
                                    <TabPanel value={`${data.cCategoryName}`}>
                                        <Box
                                            component="img"
                                            // src={data.cCategoryThumb}
                                            src={`data:image/jpeg;base64,${data.cThumb}`}
                                            // src={data.cThumb}
                                            sx={{
                                                mb: 1,
                                                objectFit: "cover",
                                                borderRadius: "10%",
                                            }}
                                        />
                                    </TabPanel>
                                ))}
                                {/* Slider + Items Mapping Ends */}

                            </Box>
                        </TabContext>
                    )}
                </Box>
            )}
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        cl: state.cl,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadcategory: () => dispatch(fetchCategoryList()),
        loadcategoryniItems:(cSearch) => dispatch(fetchCategoryNiItem(cSearch))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(testing);

