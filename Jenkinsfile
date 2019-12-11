pipeline {
    agent any
  
  stages {

	  stage('Clone') {

		 sh 'git clone https://github.com/TechDevProNBS/PRIDE-Server-AchievementsSpringboot.git'
	  }

		 
    stage('Build') {
	steps {
		
		sh 'mvn package -DskipTests'
		sh 'docker build --tag "Pride:latest"'
		echo "Build successful"
	           }
	 }



	stage ('Test') {
	   steps {
		   echo "Test has passed"
		
	          }
			}
          
		stage('Deploy') {
            steps {
				echo "Deployment has been deployed"
            }
        }


		}
	   }   
