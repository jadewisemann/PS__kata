  function solution(schedules, timelogs, startday) {
    // 일주일동안 출근 희망시각에 늦이 않고 출근한 직원에게 상품
    // 출근 시작 + 10분까지 어플로 출근
    // 모든 시각은 '시간 * 100 + 분'인 정수
    // 상품 받을 직원 수 구하기


    // n: 명의 직원
    // 희망 시각을 담은 1차우너 배열: schedules
    // 직원들의 실제 출근 시각을 당믄 2차원 배열: timelogs
    // 이벤트 시작한 요일을 의미하는정수: startday
      // 월: 1 ~ 일: 7

    // 인덱스로 직원 구분
    

    const transToMin = time => {
      const hours = Math.floor(time / 100);
      const minutes = time % 100;
      return hours * 60 + minutes 
    }
    
    const checkIsOnTime = (planedTime, realTime) =>
      transToMin(realTime) - transToMin(planedTime) <= 10;
    
    const checkIsWeekday = (startDay, dayIndex) => {
      const currentDay = (startDay + dayIndex - 1) % 7 + 1;
      return currentDay >= 1 && currentDay <= 5;
    };

    let answer = 0;
    const n = schedules.length
      
    for(let i = 0; i < n; i++) {
      let flag = true;
      const schedule = schedules[i];
      const timelog = timelogs[i];

      timelog.forEach((time, i) => {
        if(checkIsWeekday(startday, i) && !checkIsOnTime(schedule, time) && flag) {
          flag = false;
        };
      });
      
      if(flag){ answer ++ };
    }

    return answer;
  }