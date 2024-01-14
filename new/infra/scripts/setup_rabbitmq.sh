#!/bin/sh

DIR=$(realpath $(dirname "$0"))

# Load global .env
set -a
source $DIR/../../.env
set +a

echo "Variables: $RABBITMQ_USERNAME, $RABBITMQ_PASSWORD, $RABBITMQ_VHOST, $RABBITMQ_EXCHANGE"

# Start rabbitmq
systemctl start rabbitmq || systemctl start rabbitmq-server

# Reset RabbitMQ
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
# Delete guest user
rabbitmqctl delete_user guest

# Download rabbitmqadmin
wget http://127.0.0.1:15672/cli/rabbitmqadmin
chmod +x rabbitmqadmin

# Create user
rabbitmqctl add_user "$RABBITMQ_USERNAME" "$RABBITMQ_PASSWORD"
# Set user permissions
rabbitmqctl set_user_tags "$RABBITMQ_USERNAME" administrator
rabbitmqctl set_permissions -p "/" "$RABBITMQ_USERNAME" ".*" ".*" ".*"

# Create RABBITMQ_VHOST
rabbitmqctl add_vhost "$RABBITMQ_VHOST"
rabbitmqctl set_permissions -p "$RABBITMQ_VHOST" "$RABBITMQ_USERNAME" ".*" ".*" ".*"

# Create RABBITMQ_EXCHANGE
./rabbitmqadmin -u $RABBITMQ_USERNAME -p $RABBITMQ_PASSWORD -V $RABBITMQ_VHOST declare exchange name=$RABBITMQ_EXCHANGE type=direct

# Create queues
./rabbitmqadmin -u $RABBITMQ_USERNAME -p $RABBITMQ_PASSWORD -V $RABBITMQ_VHOST declare queue name=test_execution durable=true queue_type=quorum

# Create bindings
./rabbitmqadmin -u $RABBITMQ_USERNAME -p $RABBITMQ_PASSWORD -V $RABBITMQ_VHOST declare binding source="$RABBITMQ_EXCHANGE" destination_type="queue" destination="test_execution" routing_key="test_execution_routing_key"

# Delete rabbitmqadmin
rm ./rabbitmqadmin

echo "RabbitMQ setup successful."
