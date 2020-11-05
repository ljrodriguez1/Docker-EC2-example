pwd=$( aws ecr get-login-password --region us-east-1 )
sudo docker container stop $(docker container ls -aq)
sudo docker login -u AWS -p $pwd https://132819300562.dkr.ecr.us-east-1.amazonaws.com
sudo docker pull 132819300562.dkr.ecr.us-east-1.amazonaws.com/arquichatdocker