import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import MainPage from './MainPage';
import Footer from './Footer';

const App = () => {
    const [page, setPage] = useState(1);
    const [width, setWidth] = useState(window.innerWidth);
    const mobile=width<768
    
    useEffect(() => {
        window.addEventListener("resize", ()=>{setWidth(window.innerWidth)});
    },[]);
    
    const handlePage = (page,callback) => {
        let pageTitle;
        let pagePath;

        if(page===1){
            pageTitle="집중관리"
            pagePath="/home"
        }else if(page===2){
            pageTitle="커리뮬럼"
            pagePath="/curriculum"
        }else if(page===3){
            pageTitle="밀당 선생님"
            pagePath="/teachers"
        }else if(page===4){
            pageTitle="수강후기"
            pagePath="/review"
        }else if(page===5){
            pageTitle="찾아오는 길"
            pagePath="/map"
        }else{
            pageTitle="에러"
            pagePath="/error"
        }

        typeof window.gtag==="function"&&window.gtag('config', 'UA-100968789-6', {
            'page_title': pageTitle,
            'page_path': pagePath
        });

        setPage(page)
        mobile&&callback()
    }
    return (
        <div>
            <NavBar setPage={handlePage} mobile={mobile}/>
            <MainPage page={page} mobile={mobile}/>
            <Footer page={page} mobile={mobile}/>
        </div>
    )
}

export default App;