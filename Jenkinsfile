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
        environment {
          SONAR_URL= 'http://172.18.134.230:9000/'    
    }
        steps {
          withCredentials([string(credentialsId: 'sonarqube', variable: 'SONAR_AUTH_TOKEN')]) {
            sh 'mvn sonar:sonar -Dsonarlogin=$SONAR_AUTH_TOKEN -Dsonar.url=${SONAR_URL}'
      }
        }
      }
      stage('BUILD and push image') {
        environment {
          DOCKER_IMAGE="kaman623/nodejs:${BUILD_NUMBER}"
         // REGISTRY_CREDENTIALS=credentials('docker-cred') 
        }
        steps {
          withCredentials([usernamePassword(credetialsId: 'docker-cred', usernameVariable: 'DOCKER_USER', usernamePassword: 'DOCKER_PASS')])
          {
            sh ''' 
            cd node-app
            docker build -t ${DOCKER_IMAGE} .
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push ${DOCKER_IMAGE}
            docker logout
        '''
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
  
