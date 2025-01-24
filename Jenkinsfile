pipeline {
    agent any

    environment {
        NODE_ENV = "production" // Node.js 환경 설정
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/2024-Winter-BootCamp-TeamF/Frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install' // 의존성 설치
            }
        }

        stage('Test') {
            steps {
                sh 'npm test' // 테스트 실행
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build' // 빌드 실행
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                # 빌드된 파일을 서버로 복사
                scp -r build/* user@your-server:/var/www/html
                '''
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
