function solution(video_len, pos, op_start, op_end, commands) {
  // 동영상 재생기

  // 3가지 기능
    // [1] "prev":  재생위치를 10초 전으로
      // 영상이 10초 미만이면 처음으로, 처음은 0분0초
    // [2] "next": 10초 후로
      // 영상이 10초 미만이면 끝으로, 끝은 영상 길이
    // [3] 오프닝 건너 뛰기
      // 현재 재생위치가 오프닝 구간이면 오프닝이 끝나는 위치로 이동
      // `op_start` <= 현재 위치 <= `op_end    


  // param
    // `video_len`: 동영상 길이
    // `pos`: 기능 직전 재생 위치
    // `op_start`: 오프닝 시작
    // `op_end`: 오프닝 끝
    // `commands`: 사용자 입력을 나타내는 1차원 배열
  
  // return 
    // 사용자의 입력이 끝난 시점의 시간을 `mm:ss` 형식을 반환
  
  const convertSec = time => {
    const [min, sec] = time.split(':').map(Number);
    // time = Number(time);
    // const min = Math.floor(time / 100);
    // const sec = time % 100
    return min * 60 + sec
  }
  
  const formatTime = (time) => {
    console.log(time)
    const min = Math.floor(time/60);
    const sec = time % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
  }

  const op_start_sec = convertSec(op_start);
  const op_end_sec = convertSec(op_end);
  let pos_sec = convertSec(pos);
  const video_len_sec = convertSec(video_len);

  const isOpening = time => 
    time >= op_start_sec && time <= op_end_sec;

  const goNext = time => {
    const calcTime = time + 10
    return  (calcTime > video_len_sec) ? video_len_sec : calcTime 
  }

  const goPrev = time => {
    const calcTime = time - 10
    return (calcTime < 0) ? 0 : calcTime
  } 

  for(const command of commands) {
    if(isOpening(pos_sec)){
      pos_sec = op_end_sec
    }

    if (command === "next") {
      pos_sec = goNext(pos_sec)
    } else if (command === "prev") {
      pos_sec = goPrev(pos_sec)
    }

    if(isOpening(pos_sec)){
      pos_sec = op_end_sec
    }

  } 
  
  return formatTime(pos_sec);
}