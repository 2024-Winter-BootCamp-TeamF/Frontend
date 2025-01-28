# Node.js 공식 이미지를 베이스로 사용 (빌드 단계)
FROM node:16 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# Nginx를 사용하여 서빙 (실행 단계)
FROM nginx:alpine

# 빌드 결과물 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 설정
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]