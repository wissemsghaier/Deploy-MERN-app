pipeline {
    agent any


    stages {
        stage('Checkout') {
      steps {
        git url: 'https://gitlab.com/wissemsghaier2000/gestion_users', branch: 'main'
      }
    }
        stage('Install Dependencies') {
            steps {
                script {
                    dir('app_front') {
                        sh 'npm install'
                    }
                    dir('backend') {
                        sh 'npm install'
                    }
                    
                }
            }
        }

         stage('Run Tests') {
            steps {
                script {
                    dir('app_front') {
                        sh 'npm test'
                    }
                    dir('backend') {
                        sh 'npm test'
                    }
                    
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}