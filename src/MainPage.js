import React, { useState } from 'react';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Swiper, Slide } from 'react-dynamic-swiper'
import 'react-dynamic-swiper/lib/styles.css'

const MainPage = (props) => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isApplied, setIsApplied] = useState(0);
    const [progress, setProgress] = useState(false);

    const onKeyDown=(event)=>{
        if(event.keyCode===13&&!(name===""||/^010[0-9]{8}$/.test(phoneNumber)===false||isApplied===1)){
            apply()
        }
    }

    function parse_query_string(query) {
        var vars = query.split("&");
        var query_string = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);
            // If first entry with this name
            if (typeof query_string[key] === "undefined") {
                query_string[key] = decodeURIComponent(value);
                // If second entry with this name
            } else if (typeof query_string[key] === "string") {
                var arr = [query_string[key], decodeURIComponent(value)];
                query_string[key] = arr;
                // If third or later entry with this name
            } else {
                query_string[key].push(decodeURIComponent(value));
            }
        }
        return query_string;
    }

    const queryString = window.location.href.split("?")[1]
    const parsed =queryString&&parse_query_string(queryString)
    let path = 0;
    if(parsed&&parsed.path){
        path = parsed.path
    }

    const handleName=(event)=>{
        typeof window.gtag==="function"&&window.gtag('event', 'textField', {
            'event_category':'name',
            'event_label':event.target.value
        });
        setName(event.target.value)
    }

    const handlePhoneNumber=(event)=>{
        typeof window.gtag==="function"&&window.gtag('event', 'textField', {
            'event_category':'phoneNumber',
            'event_label':event.target.value
        });
        setPhoneNumber(event.target.value)
    }

    const apply = () =>{
        if(!(name===""||/^010[0-9]{8}$/.test(phoneNumber)===false||isApplied===1)){
            typeof window.gtag==="function"&&window.gtag('event', 'click', {
                'event_category':'button',
                'event_label':'apply'
            });
            setIsApplied(1)
            setProgress(true)

            let params = {
                name: name,
                phoneNumber: phoneNumber,
                type: 4,
                site: path
            };

            window.$.ajax({
                type: 'POST',
                url: 'https://english.management/dev/clients',
                data: JSON.stringify(params),
                success: function(data) {
                    setProgress(false)
                    setPhoneNumber("")
                    setName("")
                    alert("신청완료!\n\n상담은 순차적으로 진행되며, 최대한 빠르게 연락드리도록 하겠습니다 ^^");
                    typeof window.fbq==="function"&&window.fbq('track', 'CompleteRegistration')
                    typeof window.gtag==="function"&& window.gtag('config', 'UA-100968789-6', {
                        'page_title' : "신청완료",
                        'page_path': "/finish_apply"
                    });
                    typeof window.gtag==="function"&& window.gtag('event', 'conversion', {
                        'send_to': 'AW-815646131/A236CLCMn34Qs4v3hAM',
                        'transaction_id': ''
                    });
                    typeof window.kakaoPixel==="function"&&window.kakaoPixel('5204070075277067362').completeRegistration();
                    window._tfa = window._tfa || [];
                    window._tfa.push({notify: 'event', name: 'lead3', id: 1235199});
                },
                contentType: "application/json",
                dataType: 'json'
            });

            params = {
                name: name,
                applicantId: phoneNumber,
                type: 1,
                studyTime: 0,
                path: path,
                counselingTime: "아무 때나 가능"
            };

            window.$.ajax({
                type: 'POST',
                url: 'https://english.management/dev/trials',
                data: JSON.stringify(params),
                success: function(data) {},
                contentType: "application/json",
                dataType: 'json'
            });
        }else{
            alert("이름과 전화번호를 다시 확인해주세요!")
        }
    }

    const applyBar=(
        <div onKeyDown={onKeyDown}>
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button style={{position:"absolute",top:4,right:12}} type="button" className="close" data-dismiss="modal">&times;</button>
                        밀당영어 개인정보 취급방침
                    </div>
                    <div className="modal-body">
                        밀당영어 서비스를 운영 중인 ‘아이헤이트플라잉버그스(주)’ 입니다.<br/><br/>
                        밀당영어 이용자 분들의 개인정보 관련된 취급 방침입니다. 여러분의 개인정보는 서비스의 원활한 제공을 위하여 여러분들이 동의한 목적과 범위 내에서만 이용됩니다.<br/>
                        <br/>
                        여러분이 공유 해 주신 개인정보는 진정 더 나은 서비스를 제공하기 위함으로만 사용 될 것입니다.<br/>
                        밀당영어 서비스는 원활하게 제공하고 향상된 이용자 경험을 드리기 위해 필요한 여러분의 개인정보를 수집합니다. 여러분의 본인 여부나 연령, 계정이나 연락처 및 사용기기의 확인이 필요한 경우가 있습니다. 여러분의 개인정보는 연락처에 등록된 다른 이용자나, 여러분과 친구일 수도 있는 다른 이용자의 검색이나 등록, 또는 알림을 위해서도 활용되기도 합니다. 또한, 여러분에게 개별적으로 알려 드릴 사항이 있는 때나, 서비스 이용과 관련하여 문의나 분쟁이 있는 경우, 유료서비스 이용 시 컨텐츠 등의 정산을 위해서도 필요합니다. 그 외에도, 새로운 서비스 개발 및 특화, 맞춤형 서비스 제공, 기능개선, 인구통계학적 특성에 따른 서비스 제공, 각종 이벤트나 광고성 정보의 제공, 법령 등에 규정된 의무의 이행, 법령이나 이용약관에 반하여 여러분에게 피해를 줄 수 있는 잘못된 이용행위의 방지를 위해서도 여러분의 개인정보가 활용됩니다.<br/>
                        <br/>
                        밀당영어가 더 나은 서비스를 제공해 드리기 위해 수집하는 여러분의 개인정보는 아래와 같습니다.<br/>
                        여러분이 서비스에 처음 가입할 때 또는 서비스를 이용하는 과정에서 홈페이지 또는 서비스 내 개별 어플리케이션이나 프로그램 등을 통하여 이용자 이름(닉네임), 밀당영어 계정 사용 시 이메일, 비밀번호가 수집되며, 생년월일, 성별, 서비스 아이디, 사진(메타정보 포함)가 수집됩니다. 또한, 서비스 이용과정이나 사업처리 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디), IP 주소, 쿠키 정보가 자동으로 생성되어 수집될 수 있습니다.<br/>
                        <br/>
                        밀당영어는 여러분의 별도 동의가 있는 경우나 법령에 규정된 경우를 제외하고는 여러분의 개인정보를 절대 제 3 자에게 제공하지 않습니다.<br/>
                        밀당영어는 여러분이 서비스 이용과정 등에서 따로 동의하는 경우나 법령에 규정된 경우를 제외하고는 여러분의 개인정보를 위에서 말씀 드린 목적 범위를 초과하여 이용하거나 제 3 자에게 제공 또는 공유하지 않습니다.<br/>
                        <br/>
                        밀당영어에 제3 자의 서비스가 연결되어 제공되는 경우 서비스 이용을 위해 필요한 범위 내에서 여러분의 동의를 얻은 후에 개인정보를 제 3 자에게 제공할 수 있습니다. 여러분의 연결 서비스를 위한 개인정보의 제3 자 제공 내용은 다음과 같습니다.<br/>
                        <br/>
                        제공받는 자: 어플리케이션 등 서비스 제공자/제공업체<br/>
                        이용목적: 해당 어플리케이션 서비스로의 연결을 통한 맞춤 서비스제공<br/>
                        제공항목: 이용자 이름(닉네임), 프로필사진, 시청기록 등<br/>
                        보유 및 이용기간: 해당 어플리케이션 이용시까지<br/>
                        다만, 서비스의 원활한 제공을 위해 필요한 때에는 개인정보의 취급을 위탁하기도 합니다.<br/>
                        밀당영어는 서비스의 원활한 제공을 위해 필요한 때에는 개인정보의 취급을 일부 위탁처리할 수 있습니다.<br/>
                        <br/>
                        여러분(만 14 세 미만인 경우 법정 대리인)은 언제든지 여러분의 개인정보를 조회하거나 수정할 수 있으며 수집·이용에 대한 동의 철회 또는 가입 해지를 요청할 수도 있습니다. 보다 구체적으로는 서비스 설정 내 제공되는 기능을 통해 가능하며, 기능이 원활하지 않거나 도움이 필요하실 경우 고객센터를 통해 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다. 여러분이 개인정보의 오류에 대한 정정을 요청하신 경우 밀당영어는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다.<br/>
                        <br/>
                        PC 기반 서비스의 제공을 위하여 쿠키를 이용하는 경우가 있습니다.<br/>
                        밀당영어는 여러분에게 개인화되고 맞춤화된 서비스를 제공하기 위해서 여러분의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용할 수 있습니다.<br/>
                        <br/>
                        쿠키란 웹사이트를 운영하는데 이용되는 서버가 여러분의 브라우저에 보내는 작은 텍스트 파일로서 PC 의 하드디스크에 저장됩니다. 여러분이 웹 사이트에 방문할 때 웹 사이트 서버는 쿠키의 내용을 읽어 환경 설정을 유지하도록 함으로써 여러분의 웹 사이트 접속과 편리한 사용을 돕게 됩니다. 아울러 쿠키는 여러분의 웹 사이트 방문 기록, 이용 형태나 관심 분야를 알게 해 줌으로써 이를 통한 최적화된 맞춤 서비스를 제공하는 것을 가능하도록 해 줍니다. 여러분은 쿠키 설치에 대한 선택권을 가지고 있으며, 웹브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 설치를 거부하였을 경우 로그인이 필요한 일부 서비스를 이용하는 것에는 어려움이 있을 수 있음을 미리 이해해 주시기 바랍니다.<br/>
                        <br/>
                        궁금하신 사항은...<br/>
                        여러분이 서비스를 이용하면서 발생하는 모든 개인정보보호 관련 문의, 불만, 조언이나 기타 사항은 개인정보관리책임자 및 담당부서, 대표이사 직통으로 연락해 주시기 바랍니다. 밀당영어는 여러분의 목소리에 귀 기울이고 신속하고 충분한 답변을 드릴 수 있도록 최선을 다하겠습니다.<br/>
                        <br/>
                        개인정보관리책임자<br/>
                        이름: 박찬용<br/>
                        부서: 경영총괄<br/>
                        연락처: 고객센터 (cs@ihateflyingbugs.com)<br/>
                        개인정보 취급방침이 변경되는 경우 별도로 알려 드리겠습니다.<br/>
                        주식회사 아이헤이트플라잉버그스는 법률이나 서비스의 변경사항을 반영하기 위한 목적 등으로 개인정보 취급방침을 수정할 수 있습니다. 개인정보 취급방침이 변경되는 경우 주식회사 아이헤이트플라잉버그스는 변경 사항을 게시하며, 변경된 개인정보 취급방침은 게시한 날로부터 7 일 후부터 효력이 발생합니다. 하지만, 피치 못하게 여러분의 권리에 중요한 변경이 있을 경우 변경될 내용을 30 일 전에 미리 알려드리겠습니다.<br/>
                        <br/>
                        공고일자: 2018년 7월 18일<br/>
                        시행일자: 2018년 7월 18일<br/>
                        변경 전 개인정보취급방침: 현재 버전이 최초 버전입니다.<br/>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
                
                </div>
            </div>
            <div>
                <div className="card" style={{position:"fixed",bottom:0, width: "100%"}}>
                    <div className="card-body">
                        <div style={{marginBottom: "4px"}}>
                            <span style={{fontWeight:"bold", color:"#4CAF50"}}>이름과 전화번호</span>를 입력해주세요
                        </div>
                        <div style={{marginBottom: "12px", fontSize: 12}}>
                            *학부모님의 경우 이름 뒤에 학생의 학년과 "학부형"을 같이 입력해주세요 <span style={{fontWeight:"bold", color:"#4CAF50"}}>예) 홍길동 고1 학부형</span>
                        </div>
                        <div className="form-group">
                            <input style={{display:"inline-block", width:"30%"}} type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="이름" onChange={handleName} value={name}/>
                            <input style={{display:"inline-block", width:"69%", marginLeft:"1%"}} type="number" className="form-control" id="phone" placeholder={`전화번호 ("-" 없이 입력해주세요)`} onChange={handlePhoneNumber} value={phoneNumber}/>
                        </div>
                        <div style={{fontSize:"14px"}}>
                            <label>
                                <input type="checkbox" defaultChecked={true}/> 개인정보수집 이용 및 제공에 관한 동의 <span onClick={event=>event.preventDefault()} style={{cursor:"pointer", fontSize:12, textDecoration:"underline"}} data-toggle="modal" data-target="#myModal">보기</span>
                            </label>
                        </div>
                        <button style={{width:"100%"}} onClick={apply} type="submit" className="btn btn-primary" disabled={name===""||/^010[0-9]{8}$/.test(phoneNumber)===false||isApplied===1}>특별 할인 상담신청</button>
                    </div>
                </div>
                {
                    progress&&
                    <CircularProgress
                        style={{
                            position:"fixed",
                            left:"50%",
                            bottom:"10%",
                            zIndex:100000
                        }}
                    />
                }
            </div>
        </div>
    )

    if(props.mobile){
        if(props.page===1){
            return (
                <div className="opacityEffect" key={1} style={{marginTop:62}}>
                    {applyBar}
                    <img width="100%" alt="페이지" src={`./images/m${props.page}-0.png`}/>
                    <img width="100%" alt="페이지" src={`./images/m${props.page}-1.jpg`}/>
                    {/*<img width="100%" alt="페이지" src={`./images/m${props.page}-3.jpg`}/>*/}
                    <img style={{marginTop:80}} width="100%" alt="페이지" src={`./images/m${props.page}-2.jpg`}/>
                </div>
            );
        }else if(props.page===2){
            return (
                <div className="opacityEffect" key={2} style={{marginTop:80, textAlign:"center"}}>
                    <img style={{marginBottom:"48px"}} width="100%" alt="페이지" src={`./images/m${props.page}-1.jpg`}/>
                    <div style={{display:"inline-block",backgroundColor:"#18b9b3",color:"#ffffff",width:"85%",padding:"4px",fontSize:"16px",fontWeight:"bold"}}>고3</div>
                    <Swiper
                        style={{display:"inline-block", width:"100%", marginBottom:"48px"}}
                        prevButton={
	                        <div 
	                            className="swiper-button-prev"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:14,
	                                height:14,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowLeftIcon style={{color:"#18b9b3"}}/>
	                        </div>
	                    }
	                    nextButton={
	                        <div 
	                            className="swiper-button-next"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:14,
	                                height:14,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowRightIcon style={{color:"#18b9b3"}}/>
	                        </div>
	                    }
                    >
                        {[1,2,3].map((num,key)=>{
                            return (
                                <Slide key={key}>
                                    <div className={`slide-${key}`}>
                                        <img 
                                            width="85%"
                                            alt={key}
                                            src={`./images/curriculum/high3-${num}.jpg`}
                                            style={{cursor:"pointer"}}
                                        />
                                    </div>
                                </Slide>
                            )
                        })}
                    </Swiper>
                    <div style={{display:"inline-block",backgroundColor:"#18b9b3",color:"#ffffff",width:"85%",padding:"4px",fontSize:"16px",fontWeight:"bold"}}>고2</div>
                    <Swiper
                        style={{display:"inline-block", width:"100%", marginBottom:"48px"}}
                        prevButton={
	                        <div 
	                            className="swiper-button-prev"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:14,
	                                height:14,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowLeftIcon style={{color:"#18b9b3"}}/>
	                        </div>
	                    }
	                    nextButton={
	                        <div 
	                            className="swiper-button-next"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:14,
	                                height:14,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowRightIcon style={{color:"#18b9b3"}}/>
	                        </div>
	                    }
                    >
                        {[1,2,3].map((num,key)=>{
                            return (
                                <Slide key={key}>
                                    <div className={`slide-${key}`}>
                                        <img 
                                            width="85%"
                                            alt={key}
                                            src={`./images/curriculum/high2-${num}.jpg`}
                                            style={{cursor:"pointer"}}
                                        />
                                    </div>
                                </Slide>
                            )
                        })}
                    </Swiper>
                    <div style={{display:"inline-block",backgroundColor:"#18b9b3",color:"#ffffff",width:"85%",padding:"4px",fontSize:"16px",fontWeight:"bold"}}>고1</div>
                    <Swiper
                        style={{display:"inline-block", width:"100%", marginBottom:"48px"}}
                        prevButton={
	                        <div 
	                            className="swiper-button-prev"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:14,
	                                height:14,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowLeftIcon style={{color:"#18b9b3"}}/>
	                        </div>
	                    }
	                    nextButton={
	                        <div 
	                            className="swiper-button-next"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:14,
	                                height:14,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowRightIcon style={{color:"#18b9b3"}}/>
	                        </div>
	                    }
                    >
                        {[1,2,3].map((num,key)=>{
                            return (
                                <Slide key={key}>
                                    <div className={`slide-${key}`}>
                                        <img 
                                            width="85%"
                                            alt={key}
                                            src={`./images/curriculum/high1-${num}.jpg`}
                                            style={{cursor:"pointer"}}
                                        />
                                    </div>
                                </Slide>
                            )
                        })}
                    </Swiper>
                </div>
            );
        }else if(props.page===3){
            return (
                <div className="opacityEffect" key={3} style={{marginTop:80}}>
                    <img width="100%" alt="페이지" src={`./images/m${props.page}-1.jpg`}/>
                    <img width="100%" alt="페이지" src={`./images/m${props.page}-2.jpg`}/>
                </div>
            );
        }else if(props.page===4){
            return (
                <div className="opacityEffect" key={4} style={{marginTop:80, textAlign:"center"}}>
                    <img width="100%" alt="페이지" src={`./images/m${props.page}-1-1.jpg`}/>
                    <iframe style={{display:"inline-block",margin:"24px auto", height:"50vw", width:"80%"}} title="gJ0JsstWvqc" src="https://www.youtube.com/embed/gJ0JsstWvqc?autoplay=1;rel=0" frameBorder="0" allowFullScreen></iframe>
                    <iframe style={{display:"inline-block",margin:"24px auto", height:"50vw", width:"80%"}} title="q1MJBGWYSes" src="https://www.youtube.com/embed/q1MJBGWYSes?autoplay=1;rel=0" frameBorder="0" allowFullScreen></iframe>
                    <iframe style={{display:"inline-block",margin:"24px auto", height:"50vw", width:"80%"}} title="msOfwAWxi1U" src="https://www.youtube.com/embed/msOfwAWxi1U?autoplay=1;rel=0" frameBorder="0" allowFullScreen></iframe>
                    <img width="100%" alt="페이지" src={`./images/m${props.page}-1-2.jpg`}/>
                    <img width="100%" alt="페이지" src={`./images/m${props.page}-2.jpg`}/>
                </div>
            );
        }else if(props.page===5){
            return (
                <div className="opacityEffect" key={5} style={{marginTop:62, textAlign:"center"}}>
                    <img width="100%" alt="페이지" src={`./images/m${props.page}-1.jpg`}/>
                </div>
            );
        }else{
            return(
                <div>
                    잘못된 페이지입니다
                </div>
            )
        }
    }else{
        if(props.page===1){
            return (
                <div className="opacityEffect" key={1} style={{marginTop:80}}>
                    <img width="100%" alt="페이지" src={`./images/${props.page}-0.png`}/>
                    <img width="100%" alt="페이지" src={`./images/${props.page}-1.jpg`}/>
                    {/*<img width="100%" alt="페이지" src={`./images/${props.page}-3.jpg`}/>*/}
                    <img style={{marginTop:250}} width="100%" alt="페이지" src={`./images/${props.page}-2.jpg`}/>
                    {applyBar}
                </div>
            );
        }else if(props.page===2){
            return (
                <div className="opacityEffect" key={2} style={{marginTop:100, textAlign:"center"}}>
                    <img width="100%" alt="페이지" src={`./images/${props.page}-1.jpg`}/>
                    <div style={{display:"inline-block",backgroundColor:"#18b9b3",color:"#ffffff",width:"55%",padding:"8px",fontSize:"24px",fontWeight:"bold"}}>고3</div>
                    <Swiper
                        style={{display:"inline-block", width:"64.6%", marginBottom:"96px"}}
                        prevButton={
	                        <div 
	                            className="swiper-button-prev"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:72,
	                                height:72,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowLeftIcon style={{width:72,height:72,color:"#18b9b3"}}/>
	                        </div>
	                    }
	                    nextButton={
	                        <div 
	                            className="swiper-button-next"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:72,
	                                height:72,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowRightIcon style={{width:72,height:72,color:"#18b9b3"}}/>
	                        </div>
	                    }
                    >
                        {[1,2,3].map((num,key)=>{
                            return (
                                <Slide key={key}>
                                    <div className={`slide-${key}`}>
                                        <img 
                                            width="85%"
                                            alt={key}
                                            src={`./images/curriculum/high3-${num}.jpg`}
                                            style={{cursor:"pointer"}}
                                        />
                                    </div>
                                </Slide>
                            )
                        })}
                    </Swiper>
                    <div style={{display:"inline-block",backgroundColor:"#18b9b3",color:"#ffffff",width:"55%",padding:"8px",fontSize:"24px",fontWeight:"bold"}}>고2</div>
                    <Swiper
                        style={{display:"inline-block", width:"64.6%", marginBottom:"96px"}}
                        prevButton={
	                        <div 
	                            className="swiper-button-prev"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:72,
	                                height:72,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowLeftIcon style={{width:72,height:72,color:"#18b9b3"}}/>
	                        </div>
	                    }
	                    nextButton={
	                        <div 
	                            className="swiper-button-next"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:72,
	                                height:72,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowRightIcon style={{width:72,height:72,color:"#18b9b3"}}/>
	                        </div>
	                    }
                    >
                        {[1,2,3].map((num,key)=>{
                            return (
                                <Slide key={key}>
                                    <div className={`slide-${key}`}>
                                        <img 
                                            width="85%"
                                            alt={key}
                                            src={`./images/curriculum/high2-${num}.jpg`}
                                            style={{cursor:"pointer"}}
                                        />
                                    </div>
                                </Slide>
                            )
                        })}
                    </Swiper>
                    <div style={{display:"inline-block",backgroundColor:"#18b9b3",color:"#ffffff",width:"55%",padding:"8px",fontSize:"24px",fontWeight:"bold"}}>고1</div>
                    <Swiper
                        style={{display:"inline-block", width:"64.6%", marginBottom:"96px"}}
                        prevButton={
	                        <div 
	                            className="swiper-button-prev"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:72,
	                                height:72,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowLeftIcon style={{width:72,height:72,color:"#18b9b3"}}/>
	                        </div>
	                    }
	                    nextButton={
	                        <div 
	                            className="swiper-button-next"
	                            onFocus={(e)=>{e.target.style.outline="none"}}
	                            style={{
	                            	top:"50%",
	                                width:72,
	                                height:72,
	                                display:"flex",
	                                justifyContent:"center",
	                                alignItems:"center",
	                                background:"#ffffff"
	                            }}>
	                            <KeyboardArrowRightIcon style={{width:72,height:72,color:"#18b9b3"}}/>
	                        </div>
	                    }
                    >
                        {[1,2,3].map((num,key)=>{
                            return (
                                <Slide key={key}>
                                    <div className={`slide-${key}`}>
                                        <img 
                                            width="85%"
                                            alt={key}
                                            src={`./images/curriculum/high1-${num}.jpg`}
                                            style={{cursor:"pointer"}}
                                        />
                                    </div>
                                </Slide>
                            )
                        })}
                    </Swiper>
                </div>
            );
        }else if(props.page===3){
            return (
                <div className="opacityEffect" key={3} style={{marginTop:100}}>
                    <img width="100%" alt="페이지" src={`./images/${props.page}-1.jpg`}/>
                    <img width="100%" alt="페이지" src={`./images/${props.page}-2.jpg`}/>
                </div>
            );
        }else if(props.page===4){
            return (
                <div className="opacityEffect" key={4} style={{marginTop:100, textAlign:"center"}}>
                    <img width="100%" alt="페이지" src={`./images/${props.page}-1-1.jpg`}/>
                    <iframe style={{display:"inline-block",margin:"96px auto", height:"40vw", width:"70%"}} title="gJ0JsstWvqc" src="https://www.youtube.com/embed/gJ0JsstWvqc?autoplay=1;rel=0" frameBorder="0" allowFullScreen></iframe>
                    <iframe style={{display:"inline-block",margin:"96px auto", height:"40vw", width:"70%"}} title="q1MJBGWYSes" src="https://www.youtube.com/embed/q1MJBGWYSes?autoplay=1;rel=0" frameBorder="0" allowFullScreen></iframe>
                    <iframe style={{display:"inline-block",margin:"96px auto", height:"40vw", width:"70%"}} title="msOfwAWxi1U" src="https://www.youtube.com/embed/msOfwAWxi1U?autoplay=1;rel=0" frameBorder="0" allowFullScreen></iframe>
                    <img width="100%" alt="페이지" src={`./images/${props.page}-1-2.jpg`}/>
                    <img width="100%" alt="페이지" src={`./images/${props.page}-2.jpg`}/>
                </div>
            );
        }else if(props.page===5){
            return (
                <div className="opacityEffect" key={5} style={{marginTop:80, textAlign:"center"}}>
                    <img width="100%" alt="페이지" src={`./images/${props.page}-1.jpg`}/>
                </div>
            );
        }else{
            return(
                <div>
                    잘못된 페이지입니다
                </div>
            )
        }
    }
}

export default MainPage;