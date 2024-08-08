pipeline {
    agent any
    tools { nodejs "NodeJS" }

    

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://gitlab.com/wissemsghaier2000/gestion_users', branch: 'main'
            }
        }
        //  stage('Build and Run Docker Compose') {
        //     steps {
        //         script {
        //                 sh 'docker-compose up --build -d'
        //         }
        //     }
        // }
         stage('Install Dependencies') {
            steps {
                script {
                    dir('backend') {
                        script {
                        // Assurez-vous que Node.js est installé et accessible
                            nodejs(nodeJSInstallationName: 'NodeJS') {
                                sh 'npm install'
                            }
                        }
                    }
                    dir('app_front') {
                        script {
                        // Assurez-vous que Node.js est installé et accessible
                            nodejs(nodeJSInstallationName: 'NodeJS') {
                                sh 'npm install'
                            }
                        }
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    dir('app_front') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm run build'
                        }
                    }
                    dir('backend') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm run dev'
                        }
                    }
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    dir('backend') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm run test'
                        }
                    }
                    dir('app_front') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm run test'
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
