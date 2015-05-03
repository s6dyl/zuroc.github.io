
PREFIX=$(cd "$(dirname "$0")"; pwd)
cd $PREFIX
~/798/cli/publish
cp ~/798/build/* . -R
cp html/798.html index.html
hg addremove
hg ci -m "update"
hg push
