pipeline {
    agent any
    tools { nodejs "NodeJS" }

    

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://gitlab.com/wissemsghaier2000/gestion_users', branch: 'main'
                sh 'ls -l /home/ubuntu/Gestion_Project/backend' // Vérifiez la présence de package.json
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
                    dir('/home/ubuntu/Gestion_Project/app_front') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm install'
                        }
                    }
                    dir('/home/ubuntu/Gestion_Project/backend') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    dir('/app_front') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm run build'
                        }
                    }
                    dir('/backend') {
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
                    dir('/backend') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm run test'
                        }
                    }
                    dir('/app_front') {
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
