pipeline {
    agent any

    tools {
        nodejs "NodeJS"  // Jenkins에서 설정한 NodeJS의 이름과 일치해야 합니다.
    }

    environment {
        repository = "jeonjong/teamf-frontend"  // Docker Hub ID와 Repository 이름
        DOCKERHUB_CREDENTIALS = credentials('Docker-hub') // Jenkins에 등록된 Docker Hub credentials 이름
        IMAGE_TAG = "" // Docker 이미지 태그
    }

    stages {
        stage('Checkout') {
            steps {
                cleanWs() // 워크스페이스 청소
                git branch: 'main', url: "https://github.com/2024-Winter-BootCamp-TeamF/Frontend.git"
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // 의존성 설치 (npm ci) 후 'web-vitals' 패키지 설치
                    sh 'npm ci'  
                    sh 'npm install web-vitals --save'
                }
            }
        }

        stage('Run Linter (Optional)') {
            steps {
                script {
                    // ESLint 실행하여 경고를 실패로 처리하지 않도록 설정
                    // 필요시 경고를 무시하거나 `npm run lint || true` 로 실패 방지
                    sh 'npm run lint || true'
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                   sh 'export CI=false && npm run build'  // React 앱 빌드
                }
            }
        }
        

    post {
        success {
            echo 'Build and deployment successful!'
            slackSend message: "Frontend build deployed successfully - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
        failure {
            echo 'Build or deployment failed.'
            slackSend failOnError: true, message: "Frontend build failed - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
    }
}
