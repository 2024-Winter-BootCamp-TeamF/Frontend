pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Global Tool Configuration에서 설정한 이름
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/2024-Winter-BootCamp-TeamF/Frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'scp -r build/* user@your-server:/var/www/html'
            }
        }
    }
}
