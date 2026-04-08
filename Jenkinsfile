pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/kamran90-web/node-app.git'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Tests') {
            steps {
                sh 'npm test'
            }
        }
stage('Static Code Analysis') {
    steps {
        withSonarQubeEnv('sonarqube-server') {
            script {
                def scannerHome = tool 'SonarScanner'
                
                sh """
                ${scannerHome}/bin/sonar-scanner
                """
            }
        }
    }
}
      stage('BUILD and push image') {
        environment {
          DOCKER_IMAGE="kaman623/nodejs:${BUILD_NUMBER}"
         // REGISTRY_CREDENTIALS=credentials('docker-cred') 
        }
        steps {
          withCredentials([usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')])
          {
            sh ''' 
            pwd 
            ls -l
            docker build -t ${DOCKER_IMAGE} .
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push ${DOCKER_IMAGE}
            docker logout
        '''
      }
        }
      }
    }
    post {
        always {
            echo "Build finished!"
        }
        success {
            echo "Tests passed!"
        }
        failure {
            echo "Tests failed!"
        }
    }
}
  
