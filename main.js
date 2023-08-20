const gnb_lis = document.querySelectorAll("#gnb > li");
//>는 직계자손 li를 선택하기 위해서 반드시 써야합니다
//쓰지않으면 타입에러가 발생합니다
console.log(gnb_lis); //[li, li, li, li]
gnb_lis.forEach((el) => {
    //해당배열에 반복문을 적용해서
    //각각의 요소에 mouseeneter이벤트를 적용합니다
    el.addEventListener("mouseenter", (e) => {
        const sub = e.currentTarget.querySelector(".sub");
    //여기서 e.currentTarget은 마우스를 올리는 이벤트를 추적해서
    //마우스에 올린 li를 찾고, 그 li안에서 .sub를 찾아
    //변수 sub에 대입합니다 
        let isBlock = window.getComputedStyle(sub).getPropertyValue("display");
    //window 최상위 객체에서 css파일에 적힌 .sub의 css내용을 찾고
    //그곳에서 display라는 요소(property)의 값(value)을 isBlock변수에 담습니다
        sub.style.height = "0";
        //.sub css에 height값을 적지않았으므로, 기본값을 js로 지정
        //js로 변경 시키려면 반드시 초기값(기본값)이 설정이 되어있어야
        //변경후의 js가 동작합니다
        //200px이라는 밑에 subHeight에 있는 값으로 변경되려면
        //0이라는 기준점 즉 시작점이 있어야 변경이 서서히 될 수 있습니다
        if (isBlock == "none") {
        //조건문 : isBlock에 값이 none인지 비교해서 => 불린값을 유도
        //else를 쓰지않았으므로 참인경우 코드블록 안의 값을 실행
        //거짓일 경우 if문 자체를 무시
            sub.style.display = "block";
            //none에서 block으로 변경합니다
            let subHeight = sub.scrollHeight;
            //sub가 가지는 원래 height 값을 스크롤링이 가능하도록
            //scrollHeight값으로 추적해서 변수에 할당
            console.log(subHeight); //200이라는 정수가 담김
            sub.style.height = subHeight + "px";
            //200이라는 정수를 px이라는 문자를 붙여서 형변환시키고
            //sub의 height값으로 대입합니다
        }
    });
});

gnb_lis.forEach((el) => {
    el.addEventListener("mouseleave", (e) => {
    //마우스가 떠나는 이벤트가 발생하면 
        const sub = e.currentTarget.querySelector(".sub");
        let isBlock = window.getComputedStyle(sub).getPropertyValue("display");
        sub.style.height = "0";

        if (isBlock == "block") {
        //조건문으로 isBlock의 상태가 block인지를 물어서 참이면
            //sub.style.display = "0";
            sub.addEventListener("transitionend", function end() {
            //위의 마우스엔터 이벤트 발생 시, 트랜지션이 동작하는데
            //동작이 완료되는 이벤트가 발생하면, 트랜지션의 동작을 수행하는
            //이벤트 리스너를 정리하는 리무브 이벤트리스너를 발동해서
            //이벤트리스너들을 정리합니다 (리소스 절약)
            //이때 재귀함수 호출로 end()함수를 반복 적용함으로
            //transtitionend이벤트리스너도 계속적으로 정리해줍니다
                sub.removeEventListener("transitionend", end);

                sub.style.display = "none";
                //그 후에 display :none;을 부여합니다
            });
        }
    });
});


