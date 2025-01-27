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
                    sh 'npm ci'  // 의존성 설치
                    sh 'npm install web-vitals --save'
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    sh 'npm run build'  // React 앱 빌드
                }
            }
        }

        stage('Set Image Tag') {
            steps {
                script {
                    // 브랜치에 따라 이미지 태그 설정
                    if (env.BRANCH_NAME == 'main') {
                        IMAGE_TAG = "1.0.${BUILD_NUMBER}"
                    } else {
                        IMAGE_TAG = "0.0.${BUILD_NUMBER}"
                    }
                    echo "Image tag set to: ${IMAGE_TAG}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Docker 이미지를 빌드
                    sh "docker build -t ${repository}:${IMAGE_TAG} ." 
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // Docker Hub에 로그인
                    sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                }
            }
        }

        stage('Deploy Docker Image') {
            steps {
                script {
                    // Docker Hub에 이미지를 푸시
                    sh "docker push ${repository}:${IMAGE_TAG}"
                }
            }
        }

        stage('Clean Up Docker Images') {
            steps {
                script {
                    // Docker 이미지를 로컬에서 제거
                    sh "docker rmi ${repository}:${IMAGE_TAG}"
                }
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
