mkdir -p ./secrets
cd ./secrets
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 3650 -noenc -subj "/CN=localhost"
