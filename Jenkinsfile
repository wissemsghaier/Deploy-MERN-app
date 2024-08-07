pipeline {
    agent any


    stages {
        stage('Checkout') {
      steps {
        git url: 'https://gitlab.com/wissemsghaier2000/gestion_users', branch: 'main'
      }
    }
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}