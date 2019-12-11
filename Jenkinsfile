pipeline {
    agent any
  
  stages {

	  stage('Clone') {
		steps{

	echo 'echo'
	  }

	  }
    stage('Build') {
	steps {

	
		sh 'docker build -t="pride-cards" .'
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
