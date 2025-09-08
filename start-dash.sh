#/bin/bash

if ! pgrep -f "yarn dev"; then
        echo "Starting Micromax CAR-Dashboard ..."

        cd /home/dashdev/dashenv/micromax-dashboard
        export DANGEROUSLY_DISABLE_HOST_CHECK=true;

        nohup yarn dev &>/dev/null &
fi





