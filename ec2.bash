sudo yum install curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
sudo yum install git -y
git clone https://github.com/Filipe-Santos17/ec2-aula-teste
cd ec2-aula-teste/
npm i 
npm i -g pm2
npm i -g bun

pm2 start npm --name=server_api -- run dev

#npm run build
#pm2 start npm --name=server_api -- run start