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
        }
        stage('build') {
            steps {
                script {
                    dir('app_front') {
                        nodejs(nodeJSInstallationName: 'NodeJS'){
                            sh " npm run build"
                        } 
                    }
                    dir('backend') {
                        nodejs(nodeJSInstallationName: 'NodeJS'){
                            sh " npm run dev"
                        }
                    
                    }   
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    dir('app_front') {
                        
                        steps{
                            nodejs(nodeJSInstallationName: 'NodeJS'){
                                sh " npm run test "
                            }
                        }
                    }
                    dir('backend') {
                        steps{
                            nodejs(nodeJSInstallationName: 'NodeJS'){
                                sh " npm run test "
                            }
                        }
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