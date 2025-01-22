// axiosInstance.js
import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // 기본 URL 설정
});

// 요청 인터셉터에서 토큰 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 accessToken 가져오기
    if (token) {
      config.headers.Authorization = `Token ${token}`; // 요청 헤더에 Authorization 필드 추가
    }
    return config; // 수정된 config 반환
  },
  (error) => Promise.reject(error) // 에러 발생 시 거부
);

export default axiosInstance; // Axios 인스턴스 내보내기
