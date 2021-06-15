ssh root@123.60.215.79

nginx -s stop
nginx -t
# nginx.conf，这是一个主配置文件
# conf.d，这是一个文件夹，里面包含着服务器的独立的配置文件
cd /etc/nginx/conf.d

sudo /etc/init.d/nginx start
systemctl restart nginx


# permisson
sudo chown -R www-data:www-data html/*
sudo chmod -R 0755 /html/*