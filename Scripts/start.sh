#!/bin/bash 

sudo docker-compose -f /home/ubuntu2/iic2173-proyecto-semestral-grupo4/docker-compose.production.yml build
sudo docker-compose -f /home/ubuntu2/iic2173-proyecto-semestral-grupo4/docker-compose.production.yml up -d authjs nodejs