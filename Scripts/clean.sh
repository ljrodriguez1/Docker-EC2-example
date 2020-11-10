#!/bin/bash

if [ -d /home/ubuntu/iic2173-proyecto-semestral-grupo4 ]; then
    rm -rf /home/ubuntu/iic2173-proyecto-semestral-grupo4/* !'(".env")'
fi
