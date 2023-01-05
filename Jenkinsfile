def COLOR_MAP = [
  'SUCCESS': 'good',
  'FAILURE': 'danger',
]

pipeline{
  agent {
    kubernetes {
      defaultContainer 'jnlp'
      yamlFile 'build.yaml'
    }
  }

  environment {
    BUILD_IMAGE_TAG = "build-image-tag:latest"
    REGISTRY = "clcchosun0509/forumfrontend"
    REGISTRY_CREDENTIAL = 'dockerhub'
    HELM_APP_NAME = 'forumfrontend-stack'
    HELM_CHART_DIRECTORY = 'helm/forumfrontend'
    DOCKERHUB_CREDENTIALS=credentials('dockerhub')
  }

  stages{
    stage('Verify Tooling'){
      steps{
        container('docker'){
          sh 'docker version'
          sh 'docker info'
        }
      }
    }

    stage('Build'){
      steps{
        container('docker'){
          sh "docker build --target builder --tag ${env.BUILD_IMAGE_TAG} -f ./Dockerfile ."
          sh "docker run --rm ${env.BUILD_IMAGE_TAG}"
        }
      }
    }

    stage('Docker Publish'){
      steps{
        container('docker'){
          script{
            def dockerImage = docker.build("${env.REGISTRY}:${env.BUILD_NUMBER}", "--target runner --build-arg NEXT_PUBLIC_API_URL=\"http://hahahaforum.com\" --build-arg NEXT_PUBLIC_API_URL_SSL=\"https://hahahaforum.com\" -f ./Dockerfile .")
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            dockerImage.push("${env.BUILD_NUMBER}")
            dockerImage.push('latest')
          }
        }
      }
    }

    stage('Deploy To Kubernetes'){
      steps{
        container('helm'){
          sh "helm list"
          sh "helm lint ${env.HELM_CHART_DIRECTORY}"
          sh "helm upgrade --install --force ${env.HELM_APP_NAME} ${env.HELM_CHART_DIRECTORY} --set appimage=${env.REGISTRY}:${env.BUILD_NUMBER} --namespace prod"
        }
      }
    }

    stage('Clean Docker Images'){
      steps{
        container('docker'){
          sh "docker rmi ${env.BUILD_IMAGE_TAG}"
          sh "docker rmi ${env.REGISTRY}:${env.BUILD_NUMBER}"
        }
      }
    }
  }
  post{
    always{
      echo 'Slack Notifications'
      slackSend channel: '#jenkinscicd',
        color: COLOR_MAP[currentBuild.currentResult],
        message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
    }
  }
}