import React from 'react';

const Footer = (props) => {
    return (
        <div style={{width: "100%", backgroundColor: "rgb(237,239,240)", fontSize:props.mobile?"12px":"", textAlign:"center", padding: "30px", marginBottom:props.page===1?200:0}}>
            ihateflyingbugs co.,ltd<br/>
            사업자등록번호 : 101-86-69359 | 대표이사: 박찬용<br/>
            통신판매업신고 : 2013-서울마포-1269<br/>
            주소 : 서울특별시 마포구 공덕동 467 롯데캐슬프레지던트 2203호<br/>
            고객센터 : 1899-0508 | E-mail : cs@ihateflyingbugs.com<br/>
            &copy; ihateflyingbugs all right reserved.<br/>
        </div>
    );
}

export default Footer;