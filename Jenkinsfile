pipeline {
    agent any
    tools { nodejs "NodeJS" }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://gitlab.com/wissemsghaier2000/gestion_users', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    dir('/home/ubuntu/Gestion_Project/app_front') {
                        sh 'ls -l' // Liste les fichiers pour vérifier la présence de package.json
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm install'
                        }
                    }
                    dir('/home/ubuntu/Gestion_Project/backend') {
                        sh 'ls -l' // Liste les fichiers pour vérifier la présence de package.json
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
                    dir('/home/ubuntu/Gestion_Project/app_front') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm run build'
                        }
                    }
                    dir('/home/ubuntu/Gestion_Project/backend') {
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
                    dir('/home/ubuntu/Gestion_Project/backend') {
                        nodejs(nodeJSInstallationName: 'NodeJS') {
                            sh 'npm run test'
                        }
                    }
                    dir('/home/ubuntu/Gestion_Project/app_front') {
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