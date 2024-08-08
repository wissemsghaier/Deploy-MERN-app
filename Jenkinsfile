pipeline {
    agent any
    tools {nodejs "NodeJS"}


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
                        nodejs(nodeJSInstallationName: 'NodeJS'){
                            sh ' npm install'
                        } 
                    }
                    dir('backend') {
                        nodejs(nodeJSInstallationName: 'NodeJS'){
                            sh ' npm install'
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